import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { DragDropFileList } from '@/components/Form/DragDropInput/DragDropFileList'
import { DragDropTargetBox } from '@/components/Form/DragDropInput/DragDropTargetBox'

interface ContainerProps {
  todoId: number;
}

export const DragDropContainer: FC<ContainerProps> = ( props ) => {
  
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
      <DragDropTargetBox onDrop={handleFileDrop}  todoId={todoId}/>
      <DragDropFileList files={droppedFiles} />
    </>
  )
}
