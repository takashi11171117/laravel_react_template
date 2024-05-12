import type { FC } from 'react'
import { useCallback, useState } from 'react'
import * as z from 'zod'
import { FileList } from './FileList'
import { TargetBox } from './TargetBox'

interface ContainerProps {
  todoId: number;
}

export const Container: FC<ContainerProps> = ( props ) => {
  
  const [droppedFiles, setDroppedFiles] = useState<File[]>([])

  const { todoId } = props

  const handleFileDrop = useCallback(
    (item: { files: any[] }) => {
      if (item) {
        const files = item.files
        const image = files;
        setDroppedFiles(files)
      }
    },
    [setDroppedFiles],
  )
  
  return (
    <>
      <TargetBox onDrop={handleFileDrop}  todoId={todoId}/>
      <FileList files={droppedFiles} />
    </>
  )
}
