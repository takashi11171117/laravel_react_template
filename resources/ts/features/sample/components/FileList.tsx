import type { FC } from 'react'
import { useMemo } from 'react'

export interface FileListProps {
  files: File[]
}

function list(files: File[]) {
  const label = (file: File) =>
    `'${file.name}' of size '${file.size}' and type '${file.type}'`
  return files.map((file) => <div><li key={file.name}>{label(file)}</li><p>{file.size}</p></div>)
}

export const FileList: FC<FileListProps> = ({ files }) => {
  if (files.length === 0) {
    return <div>Nothing to display</div>
  }
  const fileListItems = useMemo(() => list(files), [files])
  return <div>{fileListItems}</div>
}
