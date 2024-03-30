import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import { TodoInputForUpdate } from '@/features/sample/components/TodoInputForUpdate'

type Todo = {
  id: number
  name: string
  content: string
}

type Image = {
  id: number
  title: string
  rawFilename: string
  processedFilename: string
}

export const TodoDetail = () => {
  console.log(process.env.API_URL)
  const location = useLocation()

  const todoId = location.state.todoId

  const [name, setName] = useState('')
  const handleNameCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    console.log(e.target.value)
  }

  const [content, setContent] = useState('')
  const handleContentCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    console.log(e.target.value)
  }

  const [image, setImage] = useState<File | null>(null)
  const handleImageCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage: File | null = e.target.files?.[0] || null
    if (selectedImage !== null) {
      setImage(selectedImage)
      console.log(selectedImage)
    }
  }

  const [title, setTitle] = useState('')
  const handleImageTitleCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    console.log(e.target.value)
  }

  const [filename, setFileName] = useState('')
  const handleImageFileNameCreation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFileName(e.target.value)
    console.log(e.target.value)
  }

  const [updatedTitle, setUpdatedTitle] = useState('')

  const [updatedFilename, setUpdatedFilename] = useState('')

  const handleUpdatedImageInfo = (title: string, filename: string) => {
    setUpdatedTitle(title)
    setUpdatedFilename(filename)
    console.log(`updatedTitle: ${title}---updatedFilename: ${filename}`)
  }

  const queryClient = useQueryClient()

  const fetchTodo = async (id: number) => {
    try {
      const response = await axios.get(`/todos/${id}`)
      return response.data.data
    } catch (error) {
      console.error('データを取得できませんでした:', error)
      throw new Error('データの取得に失敗しました')
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetchTodo(todoId),
  })

  const updateTodoMutation = useMutation({
    mutationFn: (id: number) => {
      return axios
        .put(`/todos/${id}`, {
          name: name,
          content: content,
        })
        .then((response: any) => {
          console.log(response)
        })
        .then(() => {
          setName('')
          setContent('')
        })
        .catch((error: { name: { required: any } }) => {
          console.log(error)
          alert(error.name.required)
        })
    },
  })

  const handleTodoUpdate = async (id: number) => {
    try {
      if (name === '') {
        alert('名前は必ず入力して下さい')
        return
      }
      if (name.length > 10) {
        console.log(name.length)
        alert('名前は必ず10文字以下にして下さい')
        return
      }
      if (content.length > 50) {
        alert('内容は必ず50文字以下にして下さい')
        return
      }
      await updateTodoMutation.mutateAsync(todoId)

      await queryClient.invalidateQueries({ queryKey: ['todo'] })
    } catch (error) {
      console.error('Todoの更新に失敗しました:', error)
    }
  }

  const storeImageForTodoMutation = useMutation({
    mutationFn: (id: number) => {
      const formData = new FormData()
      if (image !== null) {
        formData.append('image', image)
        formData.append('title', title)
        formData.append('filename', filename)
      }

      return axios
        .post(`/todos/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response: any) => {
          console.log(response)
        })
        .then(() => {
          setTitle('')
          setFileName('')
        })
        .catch((error: { response: { data: { message: any } } }) => {
          console.log(error)
          console.log(error.response.data)
          alert(error.response.data.message)
        })
    },
  })

  const handleImageForTodoStorage = async (id: number) => {
    try {
      if (title.length > 10) {
        console.log(title.length)
        alert('名前は必ず10文字以下にして下さい')
        return
      }

      if (!/\.(jpg|jpeg|png)$/i.test(filename)) {
        alert('有効なファイル形式は .jpg, .jpeg, .png です。')
        return
      }

      if (filename.length > 50) {
        alert('imageFileNameは必ず50文字以下にして下さい')
        return
      }

      await storeImageForTodoMutation.mutateAsync(todoId)

      await queryClient.invalidateQueries({ queryKey: ['todo'] })

      setImage(null)
    } catch (error) {
      console.error('Todoの画像保存に失敗しました:', error)
    }
  }

  const storePDFForTodoMutation = useMutation({
    mutationFn: (todo: Todo) => {
      const pdfFilename = `${todo.content}.pdf`

      return axios
        .post(`/todos/${todo.id}/pdf`, {
          filename: pdfFilename,
        })
        .then((response: any) => {
          console.log(response)
        })
        .catch((error: { response: { data: { message: any } } }) => {
          console.log(error)
          console.log(error.response.data)
          alert(error.response.data.message)
        })
    },
  })

  const handlePDFForTodoStorage = async (todo: Todo) => {
    try {
      await storePDFForTodoMutation.mutateAsync(todo)

      await queryClient.invalidateQueries({ queryKey: ['todo'] })
    } catch (error) {
      console.error('pdfの作成に失敗しました:', error)
    }
  }

  const updateImageForTodoMutation = useMutation({
    mutationFn: ({ todoId, imageId }: { todoId: number; imageId: number }) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const formData = new FormData()

      if (image !== null) {
        console.log(`updatedTitle: ${updatedTitle}`)
        console.log(`updatedFilename: ${updatedFilename}`)
        formData.append('image', image)
        formData.append('title', updatedTitle)
        formData.append('filename', updatedFilename)

        return axios
          .post(`/todos/${todoId}/${imageId}`, formData, config)
          .then((response: any) => {
            console.log(response)
          })
          .catch((error: { name: { required: any } }) => {
            console.log(error)
            alert(error.name.required)
          })
      } else {
        return axios
          .post(`/api/todos/${todoId}/${imageId}`, {
            title: updatedTitle,
            filename: updatedFilename,
          })
          .then((response: any) => {
            console.log(response)
          })
          .catch((error: { name: { required: any } }) => {
            console.log(error)
            alert(error.name.required)
          })
      }
    },
  })

  const handleImageForTodoUpdate = async (todoId: number, imageId: number) => {
    try {
      if (updatedTitle.length > 10) {
        console.log(updatedTitle.length)
        alert('名前は必ず10文字以下にして下さい')
        return
      }

      if (!/\.(jpg|jpeg|png)$/i.test(updatedFilename)) {
        alert('有効なファイル形式は .jpg, .jpeg, .png です。')
        return
      }

      if (updatedFilename.length > 50) {
        alert('imageFileNameは必ず50文字以下にして下さい')
        return
      }

      await updateImageForTodoMutation.mutateAsync({ todoId, imageId })

      await queryClient.invalidateQueries({ queryKey: ['todo'] })

      setImage(null)
    } catch (error) {
      console.error('画像テーブルデータ更新に失敗しました:', error)
    }
  }

  const deleteImageForTodoMutation = useMutation({
    mutationFn: ({ todoId, imageId }: { todoId: number; imageId: number }) => {
      return axios
        .delete(`/todos/${todoId}/${imageId}`)
        .then((response: any) => {
          console.log(response)
        })
        .catch((error: { name: { required: any } }) => {
          console.log(error)
          alert(error.name.required)
        })
    },
  })

  const handleImageForTodoDeletion = async (
    todoId: number,
    imageId: number,
  ) => {
    try {
      await deleteImageForTodoMutation.mutateAsync({ todoId, imageId })

      await queryClient.invalidateQueries({ queryKey: ['todo'] })
    } catch (error) {
      console.error('画像テーブルデータ削除に失敗しました:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const todo = data
  //console.log(data);

  const filenames = todo.image_filenames
  //console.log(filenames);

  const imageIds = todo.image_ids
  //console.log(imageIds);

  const imageTitles = todo.image_titles
  //console.log(imageTitles);

  const processedFilenames = filenames.map(
    (filename: string, index: number) => {
      return `/storage/images/${filename}`
    },
  )
  //console.log(processedFilenames);

  const imageInfos: Image[] = imageIds.map((id: number, index: number) => {
    return {
      id: id,
      title: imageTitles[index],
      rawFilename: filenames[index],
      processedFilename: processedFilenames[index],
    }
  })
  //console.log(imageInfos);

  /*
  更新の場合は、
  画面の名前、内容の入力欄に書き込んで更新したいtodoの下にある更新ボタンを押します
  */
  return (
    <div>
      <h1>TodoDetail is here.</h1>
      <p>名前: {todo.name}</p>
      <p>内容: {todo.content}</p>
      <label>
        名前:
        <input value={name} onChange={handleNameCreation} />
      </label>
      <label>
        内容:
        <input value={content} onChange={handleContentCreation} />
      </label>
      <div>
        <button onClick={() => handleTodoUpdate(todo.id)}>更新</button>
      </div>
      <br />
      <br />
      <div>
        <button onClick={() => handlePDFForTodoStorage(todo)}>PDF作成</button>
      </div>
      <br />
      <form>
        <label htmlFor="image">画像</label>
        <input
          onChange={handleImageCreation}
          type="file"
          id="image"
          name="image"
          required
          accept="image/png, image/jpeg, image/jpg"
        />
        <label htmlFor="title">タイトル</label>
        <input
          value={title}
          onChange={handleImageTitleCreation}
          type="text"
          id="title"
          name="title"
        />
        <label htmlFor="imageFileName">ファイル名</label>
        <input
          value={filename}
          onChange={handleImageFileNameCreation}
          type="text"
          id="filename"
          name="filename"
          required
        />
        <button
          onClick={() => handleImageForTodoStorage(todo.id)}
          type="button">
          登録する
        </button>
      </form>
      {imageInfos.map((imageInfo: Image, index: number) => (
        <div key={index}>
          <img src={imageInfo.processedFilename} />
          <p>{imageInfo.id}</p>
          <p>{imageInfo.title}</p>
          <p>{imageInfo.rawFilename}</p>
          <label htmlFor="image">画像</label>
          <input
            onChange={handleImageCreation}
            type="file"
            id="image"
            name="image"
            required
            accept="image/png, image/jpeg, image/jpg"
          />
          <TodoInputForUpdate
            updatedTitle={updatedTitle}
            updatedFilename={updatedFilename}
            title={imageInfo.title}
            filename={imageInfo.rawFilename}
            handleOnClick={handleUpdatedImageInfo}
            setUpdatedTitle={setUpdatedTitle}
            setUpdatedFilename={setUpdatedFilename}
          />
          <button
            onClick={() => handleImageForTodoUpdate(todo.id, imageInfo.id)}
            type="button">
            更新する
          </button>
          <br />
          <button
            onClick={() => {
              handleImageForTodoDeletion(todo.id, imageInfo.id)
              console.log(imageInfo.id)
            }}
            type="button">
            削除する
          </button>
        </div>
      ))}
    </div>
  )
}
