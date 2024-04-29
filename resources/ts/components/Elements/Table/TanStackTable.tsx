import { useState } from 'react' 
import { useQueryClient } from '@tanstack/react-query'
import {
  Column,
  ColumnDef,
  SortDirection,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  TiEdit,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti'
import tw, { css, styled } from 'twin.macro'
import { useFetchTodos, useFetchTodosPaginated } from '@/features/sample/hooks/viewModel/todos/useFetchTodos'

type tableProps = {
  todosInfo: Todo[]
  todosTotal: number
}

const sortableHeader =
  (headerName: string) =>
  ({ column }: { column: Column<Todo, unknown> }): JSX.Element => {
    return (
      <div
        style={{ flex: 'auto', alignItems: 'center', cursor: 'pointer' }}
        onClick={column.getToggleSortingHandler()}>
        {headerName}
        {getSortIcon(column.getIsSorted())}
      </div>
    )
  }

const columnHelper = createColumnHelper<Todo>()

const columns: ColumnDef<Todo>[] = [
  columnHelper.group({
    id: 'Actions',
    header: () => <span>Bt</span>,
    columns: [
      columnHelper.accessor(row => row.name, {
        id: 'name',
        cell: todo => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() =>
                alert(`${todo.getValue()}の編集ボタンがクリックされました。`)
              }>
              <TiEdit />
            </div>
          )
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'Identification',
    header: () => <span>Identification</span>,
    columns: [
      columnHelper.accessor(row => row.id, {
        id: 'id',
        header: sortableHeader('ID'),
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.name, {
        id: 'name',
        header: () => <span>name</span>,
        cell: info => {
          const name: string = info.getValue()
          return name.concat('**')
        },
        footer: info => info.column.id,
      }),
    ],
  }),
  columnHelper.group({
    id: 'Content',
    header: () => <span>Content</span>,
    columns: [
      columnHelper.accessor(row => row.content, {
        id: 'content',
        header: () => <span>content</span>,
        cell: info => info.renderValue(),
        footer: info => info.column.id,
      }),
    ],
  }),
]

const initialPageIndex = 0
const initialPageSize = 3

const getSortIcon = (sortDirection: false | SortDirection): JSX.Element => {
  switch (sortDirection) {
    case 'asc':
      return <TiArrowSortedUp />
    case 'desc':
      return <TiArrowSortedDown />
    default:
      return <TiArrowUnsorted />
  }
}

export const TanStackTable = ({ todosInfo, todosTotal }: tableProps) => {

  const [page, setPage] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(3);

  const queryClient = useQueryClient()

  const table = useReactTable({
    data: [],
    columns,
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
      sorting: [{ id: 'id', desc: true }],
    },
    rowCount: todosTotal,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const { data, isLoading, isError } = useFetchTodosPaginated(page+1,pageSize)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>
  if (data === undefined) return <div>data is undefined</div>

  const todosTotalM = data.meta.total
  
  console.log(`todosTotalM = ${todosTotalM}`)
  console.log(data.meta.last_page)

  const todosInfoM = data.data.items

  const pageSizeVariationArray = [3,4,5]

  const newTableOptions = {
    ...table.options,
    data: todosInfoM,
    rowCount:  todosTotalM, 
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSizeVariationArray[1],
      },
      sorting: [{ id: 'id', desc: true }],
    },
  };

  table.setOptions(newTableOptions)

  const handleNextPage = async () => {
    if(page + 1 > table.getPageCount()){
      return
    }
    const nextPage = page + 1;
    await setPage(nextPage); 
    await queryClient.invalidateQueries();
    await table.nextPage()
  }

  const handlePreviousPage = async () => {
    if(page - 1 < 0){
      return
    }
    const previousPage = page - 1;
    await setPage(previousPage); 
    await queryClient.invalidateQueries();
    await table.previousPage()
  }

  const handlePageButton = async (page:number) => {
    await setPage(page); 
    await queryClient.invalidateQueries();
    await table.setPageIndex(page) 
  }

  const handlePageSize = async (pageSize:number) => {
    await setPageSize(pageSize) 
    await queryClient.invalidateQueries();
    await table.setPageSize(pageSize)
  }


  return (
    <div>
      TanStackTable
      <Table>
        <tbody>
          <tr>
            <td>PaginationStclsxate</td>
            <td>{JSON.stringify(table.getState().pagination)}</td>
          </tr>
          <tr>
            <td>SortingState</td>
            <td>{JSON.stringify(table.getState().sorting)}</td>
          </tr>
          <tr>
            <td>FilteringState</td>
            <td>{JSON.stringify(table.getState().columnFilters)}</td>
          </tr>
        </tbody>
      </Table>
      <div style={{ margin: '5px' }}>
        dropdown
        <select
          style={{ margin: '5px' }}
          value={table.getState().pagination.pageSize}
          onChange={e => {handlePageSize(Number(e.target.value))}}
          >
          {pageSizeVariationArray.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              表示数 {pageSize}
            </option>
          ))}
        </select>
        arrow
        <button
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        {table.getPageOptions().map(page => {

          const currentPage = table.getState().pagination.pageIndex;
          const totalPages = table.getPageCount()
        
          const isCurrentPage = page === currentPage;
          const isWithinRange = page === currentPage - 1 || page === currentPage + 1;
  
          if (isCurrentPage || isWithinRange ) {
            return (
              <button
                key={page}
                onClick={page < currentPage ? handlePreviousPage : handleNextPage }
                disabled={isCurrentPage}
              >
                {page + 1}
              </button>
            );
          }
          else if(page === 0 || page === totalPages -1){
            return (
              <button
                key={page}
                onClick={() => handlePageButton(page) }
                disabled={isCurrentPage}
              >
                {page + 1}
              </button>
            );
          }
          return null;
        })}
        <button
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        arrow
        <div style={{ padding: '10px' }}>
          <input
            placeholder="Filter name..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={e =>
              table.getColumn('name')?.setFilterValue(e.target.value)
            }
          />
        </div>
      </div>
      ここから表の区画
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const Table = styled.table`
  ${tw`border-2 border-black p-0.5`}

  th {
    border: 1px dashed lightgray;
    border-bottom: 1px solid black;
    padding: 4px;
    background: lavender;
  }

  td {
    border: 1px dashed lightgray;
    padding: 4px;
  }
`
