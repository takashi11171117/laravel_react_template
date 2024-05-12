import type { CSSProperties, FC } from 'react'
import { useState } from 'react'
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

  const [errors, setErrors] = useState(null);

  const { storeImageForTodoMutateAsync } = useStoreImageForTodo()
  const queryClient = useQueryClient()

  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
  
  const schema = z.object({
    image: z
    .custom<File>()
    .refine((image) => IMAGE_TYPES.includes(image.type), {
      message: '.jpegもしくは.jpgもしくは.pngのみ可能です',
      path: ["file_type"],
    })
    .refine((image) => image.size > 0, { message: '画像ファイルを必ず選んでください', path:['file_is_chosen'] })
    .refine((image) => image.size < 500000, { message: 'ファイルサイズは最大5MBです', path: ["file_size"] })
  })

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      
      drop(item: { files: File[] }) {

        const min = 1;
        const max = 1000;          
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        const title = `drag${randomInt}`
        const filename = `dragged_image${randomInt}.jpg`

        const imageList = item.files

        console.log(imageList[0]);
        const result = schema.safeParse({image: item.files[0]});
        
        if(!result.success){
          console.log(result.error);
          const errorMessage = result.error.errors.map((error) => error.message).join('\n');
          alert(errorMessage);
          return;
        }

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
        uploadImage(imageList[0]);
      },
      canDrop(item: any) {
        return true
      },
      hover(item: any) {
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item) {
          
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
