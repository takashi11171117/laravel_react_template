
import * as React from "react";
import ReactDOM from "react-dom/client";
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
} from "@tanstack/react-table";
import {
  TiEdit,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";


type Props = {
  todosInfo: Todo[];
};

const sortableHeader =
    (headerName: string) =>
    ({ column }: { column: Column<Todo, unknown> }): JSX.Element => {
      return (
        <div
          style={{ flex: 'auto', alignItems: 'center', cursor: 'pointer' }}
          onClick={column.getToggleSortingHandler()}
        >
          {headerName}
          {getSortIcon(column.getIsSorted())}
        </div>
    );
  };

const columnHelper = createColumnHelper<Todo>();

const columns: ColumnDef<Todo>[]  = [
  columnHelper.group({
    id: 'Actions',
    header: () => <span>Bt</span>,
    columns: [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (todo) => {
          return (
              <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                      alert(`${todo.getValue()}の編集ボタンがクリックされました。`)
                  }
              >
                <TiEdit />
              </div>
          );
      }})
    ],
  }),
  columnHelper.group({
    id: 'Identification',
    header: () => <span>Identification</span>,
    columns: [
      columnHelper.accessor((row) => row.id, {
        id: "id",
        header: sortableHeader('ID'),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: () => <span>name</span>,
        cell: (info) => {const name:string = info.getValue(); return name.concat("**")},
        footer: (info) => info.column.id,
      }),
    ],
  }),
  columnHelper.group({
    id: 'Content',
    header: () => <span>Content</span>,
    columns: [
      columnHelper.accessor((row) => row.content, {
        id: "content",
        header: () => <span>content</span>,
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
    ],
  }),
];

const initialPageIndex = 0;
const initialPageSize = 3;

const getSortIcon = (sortDirection: false | SortDirection): JSX.Element => {
  switch (sortDirection) {
    case 'asc':
      return <TiArrowSortedUp />;
    case 'desc':
      return <TiArrowSortedDown />;
    default:
      return <TiArrowUnsorted />;
  }
};

export const TanStackTable = ({ todosInfo }: Props) => {

  const table = useReactTable({
    data: todosInfo,
    columns,
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
      sorting: [{ id: "id", desc: true }],
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  return(
    <div>
      TanStackTable
      <table>
          <tbody>
            <tr>
              <td>PaginationState</td>
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
      </table>
      <div style={{ margin: '5px' }}>
          <select
            style={{ margin: '5px' }}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[3, 4, 5].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                表示数 {pageSize}
              </option>
            ))}
          </select>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          {table.getPageOptions().map((page) => {
            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                disabled={table.getState().pagination.pageIndex === page}
              >
                {page + 1}
              </button>
            );
          })}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <div style={{ padding: '10px' }}>
            <input
              placeholder="Filter name..."
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(e) =>
                table.getColumn('name')?.setFilterValue(e.target.value)
              }
            />
          </div>
        </div>
      <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  ) 
}