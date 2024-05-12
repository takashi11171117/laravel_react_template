import { useQueryClient } from '@tanstack/react-query'
import { UpdateImageInfoForm } from '@/features/sample/components/UpdateImageInfoForm'
import { DeleteImageInfoButton } from '@/features/sample/components/DeleteImageInfoButton'


type Props = {
  imagesInfo: Image[]
  todoId: number
}

export const ImageListItem = ({ imagesInfo, todoId }: Props) => {

  const queryClient = useQueryClient()

  return (
    <div>
      {imagesInfo.map((imageInfo: Image, index: number) => (
        <div key={index}>
          <img src={imageInfo.processedFilename} />
          <p>{imageInfo.id}</p>
          <p>{imageInfo.title}</p>
          <p>{imageInfo.rawFilename}</p>
          <UpdateImageInfoForm onSuccess={() => {}} todoId={todoId} imageId={imageInfo.id}/>
          <br />
          <DeleteImageInfoButton todoId={todoId} imageId={imageInfo.id}/>
        </div>
      ))}
    </div>
  )
}