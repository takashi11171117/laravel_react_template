import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TodoInputForUpdate } from '@/pages/TodoInputForUpdate';

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

  const location = useLocation();

  const todoId  = location.state.todoId

  console.log(`todoId = ${todoId}`);

  const [name, setName] = useState('');
  const handleNameCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const [content, setContent] = useState('');
  const handleContentCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  const [image, setImage] = useState<File | null>(null);
  const handleImageCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage: File | null = e.target.files?.[0] || null;
    if(selectedImage !== null){
      setImage(selectedImage);
      console.log(selectedImage);
    }
    alert("handleImageFileNameCreation");
  };

  const [title, setTitle] = useState('');
  const handleImageTitleCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const [filename, setFileName] = useState('');
  const handleImageFileNameCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    console.log(e.target.value);
  };


  const [updatedTitle, setUpdatedTitle] = useState('');
  const handleImageUpdatedTitleCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
    console.log(e.target.value);
  };



  const queryClient = useQueryClient();

  const fetchTodo = async (id:number) => {
    try {
      const response = await axios.get(`http://localhost/api/todos/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('データを取得できませんでした:', error);
      throw new Error('データの取得に失敗しました');
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetchTodo(todoId)
  })

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost/api/images');
      //console.log(response.data.images);
      return response.data.images;
    } catch (error) {
      console.error('データを取得できませんでした:', error);
      throw new Error('データの取得に失敗しました');
    }
  }

  const { data:imageData, isLoading:isLoadingForImage, isError:isErrorForImage } = useQuery({
    queryKey: ['images'],
    queryFn: () => fetchImages()
  })

  const updateTodoMutation = useMutation({
    mutationFn: (id:number) => {
      return axios
        .put(`http://localhost/api/todos/${id}`, {
          name: name,
          content: content,
        })
        .then((response) => {
          console.log(response)
        })
        .then(() => {
          setName('');
          setContent('');
        })
        .catch((error) => {console.log(error); alert(error.name.required)});
    },
  });

  const handleTodoUpdate = async (id:number) => {
    try {
      if(name === ''){
        alert("名前は必ず入力して下さい");
        return;
      }
      if(name.length > 10){
        console.log(name.length)
        alert("名前は必ず10文字以下にして下さい");
        return;
      }
      if(content.length > 50){
        alert("内容は必ず50文字以下にして下さい");
        return;
      }
      await updateTodoMutation.mutateAsync(todoId);
      
      await queryClient.invalidateQueries({queryKey: ['todo']})

    } catch (error) {
      console.error('Todoの更新に失敗しました:', error);
    }
  }

  const storeImageForTodoMutation = useMutation({
    mutationFn: (id:number) => {
    
      const formData = new FormData();
      if(image !== null){ 
        formData.append('image',image); 
        formData.append('title', title);
        formData.append('filename', filename);
      }

      formData.forEach(element => {
        console.log(element);
      });
      
      return axios
        .post(`http://localhost/api/todos/${id}`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data', // フォームデータを送信する際にはContent-Typeを設定する必要があります
          },
        })
        .then((response) => {
          console.log(response)
        })
        .then(() => {
          setTitle('');
          setFileName('');
        })
        .catch((error) => {console.log("ここが動いたよ");console.log(error); console.log(error.response.data); alert(error.name.required)});
        },
  });

  const handleImageForTodoStorage = async (id:number) => {
    try {
      if(title.length > 10){
        console.log(title.length)
        alert("名前は必ず10文字以下にして下さい");
        return;
      }

      if (!/\.(jpg|jpeg|png)$/i.test(filename)) {
        alert('有効なファイル形式は .jpg, .jpeg, .png です。');
        return;
      }

      if(filename.length > 50){
        alert("imageFileNameは必ず50文字以下にして下さい");
        return;
      }

      await storeImageForTodoMutation.mutateAsync(todoId);
      
      await queryClient.invalidateQueries({queryKey: ['todo']})

    } catch (error) {
      console.error('Todoの画像保存に失敗しました:', error);
    }
  }

  const updateImageForTodoMutation = useMutation({
    mutationFn: (id:number) => {
      return axios
        .put(`http://localhost/api/images/${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {console.log(error); alert(error.name.required)});
    },
  });

  const handleImageForTodoUpdate = async (id:number) => {
    try {

      await updateImageForTodoMutation.mutateAsync(id);
      
      await queryClient.invalidateQueries({queryKey: ['images']})
      await queryClient.invalidateQueries({queryKey: ['todo']})

    } catch (error) {
      console.error('画像テーブルデータ更新に失敗しました:', error);
    }
  }

  const deleteImageForTodoMutation = useMutation({
    mutationFn: (id:number) => {
      return axios
        .delete(`http://localhost/api/images/${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {console.log(error); alert(error.name.required)});
    },
  });

  const handleImageForTodoDeletion = async (id:number) => {
    try {

      await deleteImageForTodoMutation.mutateAsync(id);
      
      await queryClient.invalidateQueries({queryKey: ['images']})
      await queryClient.invalidateQueries({queryKey: ['todo']})

    } catch (error) {
      console.error('画像テーブルデータ削除に失敗しました:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const todo = data;
  //console.log(data);

  const filenames = todo.image_filenames;
  //console.log(filenames);
  
  const imageIds = todo.image_ids;
  //console.log(imageIds);

  const imageTitles = todo.image_titles;
  //console.log(imageTitles);

  const processedFilenames = filenames.map((filename: string, index: number) => {
    return `/storage/images/${filename}`;
  });
  //console.log(processedFilenames);

  const imageInfos : Image[] = imageIds.map((id:number, index:number) => {
    return {
      id: id,
      title: imageTitles[index],
      rawFilename: filenames[index],
      processedFilename: processedFilenames[index]
    };
  });
  console.log(imageInfos);

  /*
  更新の場合は、
  画面の名前、内容の入力欄に書き込んで更新したいtodoの下にある更新ボタンを押します
  */
  return (
    <div>
      <h1>TodoDetail is here.</h1>
      <p>名前: {todo.name}</p>
      <p>内容: {todo.content}</p>
      <label>名前:
        <input value={name} onChange={handleNameCreation} />
      </label>
      <label>内容:
        <input value={content} onChange={handleContentCreation} />
      </label>
      <div>
        <button onClick={() => handleTodoUpdate(todo.id)}>更新</button>
      </div>
      <br/>
      <form >
        <label htmlFor="image">画像</label>
        <input onChange={handleImageCreation} type="file" id="image" name="image" required accept="image/png, image/jpeg, image/jpg" />
        <label htmlFor="title">タイトル</label>
        <input value={title} onChange={handleImageTitleCreation} type="text" id="title" name="title" />
        <label htmlFor="imageFileName">ファイル名</label>
        <input value={filename} onChange={handleImageFileNameCreation} type="text" id="filename" name="filename" required />
        <button onClick={() => handleImageForTodoStorage(todo.id)} type="button">登録する</button>
      </form>
      {imageInfos.map((imageInfo:Image, index: number) => (
        <div key={index}>
          <img src={imageInfo.processedFilename}/>
          <p>{imageInfo.id}</p>
          <p>{imageInfo.title}</p>
          <p>{imageInfo.rawFilename}</p>
          <TodoInputForUpdate title = {updatedTitle}  />
          <button onClick={() => {handleImageForTodoDeletion(imageInfo.id); console.log(imageInfo.id)}} type="button">削除する</button>
          <label htmlFor="image">画像</label>
        </div>
      ))}
    </div>
  )
}

/*
handleImageCreation

            <input value={imageInfo.title} onChange={handleImageTitleCreation} type="text" id="title" name="title" />
*/
/*
{imageInfos.map((imageInfo:Image, index: number) => (
  <div key={index}>
    <p>{imageInfo.id}</p>
    <p>{imageInfo.title}</p>
    <p>{imageInfo.rawFilename}</p>
    <TodoInputForUpdate title = {updatedTitle} handleOnChange = {handleImageUpdatedTitleCreation} />
  </div>
))}
*/
/*
{imageInfos.map((imageInfo:Image, index: number) => (
  <div key={index}>
    <img src={imageInfo.processedFilename}/>
    <p>{imageInfo.id}</p>
    <button onClick={() => {handleImageForTodoDeletion(imageInfo.id); console.log(imageInfo.id)}} type="button">削除する</button>
    <label htmlFor="image">画像</label>
  </div>
))}
*/