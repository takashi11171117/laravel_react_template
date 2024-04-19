import type { CSSProperties, FC } from 'react'
import * as z from 'zod'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreImageForTodo } from '@/features/sample/hooks/viewModel/todos/useStoreImageForTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

export interface TargetBoxProps {
  onDrop: (item: { files: any[] }) => void
  todoId: number
}

export const TargetBox: FC<TargetBoxProps> = (props) => {
  const { onDrop, todoId} = props

  const { storeImageForTodoMutateAsync } = useStoreImageForTodo()
  const queryClient = useQueryClient()

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        const min = 1;
        const max = 1000;          
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        const title = `drag${randomInt}`
        const filename = `dragged_image${randomInt}.jpg`
        const file = item.files[0]
        const image = file;
        console.log(image)
        if (onDrop) {
          onDrop(item)
        }
        const uploadImage = async (image:File) => {
          try {
            await storeImageForTodoMutateAsync({ title, filename, image, todoId })
            await queryClient.invalidateQueries({ queryKey: todosKeys.each })
          } catch (error: any) {
            
          }
        }
        uploadImage(image);
      },
      canDrop(item: any) {
        //console.log('canDrop', item.files, item.items)
        return true
      },
      hover(item: any) {
        console.log('hover', item.files, item.items)
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item) {
          console.log('collect', item.files, item.items)
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [props],
  )

  const isActive = canDrop && isOver
  return (
    <div ref={drop} style={style}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  )
}
