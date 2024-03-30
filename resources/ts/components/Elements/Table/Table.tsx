import { ArchiveBoxIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import tw, { css } from 'twin.macro'

type TableColumn<Entry> = {
  title: string
  field: keyof Entry
  Cell?({ entry }: { entry: Entry }): React.ReactElement
}

export type TableProps<Entry> = {
  data: Entry[]
  columns: TableColumn<Entry>[]
}

export const Table = <Entry extends { id: string }>({
  data,
  columns,
}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div css={tableNoEntry}>
        <ArchiveBoxIcon css={tableNoEntryIcon} />
        <h4>No Entries Found</h4>
      </div>
    )
  }
  return (
    <div css={tableContainer}>
      <div css={tableContainer2}>
        <div css={tableContainer3}>
          <div css={tableContainer4}>
            <table css={table}>
              <thead css={tableHead}>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.title + index}
                      scope="col"
                      css={tableHeadItem}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr key={entry?.id || entryIndex} css={tableBodyTr}>
                    {columns.map(({ Cell, field, title }, columnIndex) => (
                      <td key={title + columnIndex} css={tableBodyTd}>
                        {Cell ? <Cell entry={entry} /> : <>{entry[field]}</>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const tableNoEntry = css`
  ${tw`flex flex-col items-center justify-center text-gray-500 bg-white h-80`}
`

const tableNoEntryIcon = css`
  ${tw`w-16 h-16`}
`

const tableContainer = css`
  ${tw`flex flex-col`}
`

const tableContainer2 = css`
  ${tw`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}
`

const tableContainer3 = css`
  ${tw`inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8`}
`

const tableContainer4 = css`
  ${tw`overflow-hidden border-b border-gray-200 shadow sm:rounded-lg`}
`

const table = css`
  ${tw`min-w-full divide-y divide-gray-200`}
`

const tableHead = css`
  ${tw`bg-gray-50`}
`

const tableHeadItem = css`
  ${tw`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}
`

const tableBodyTr = css`
  ${tw`odd:bg-white even:bg-gray-100`}
`

const tableBodyTd = css`
  ${tw`px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap`}
`
