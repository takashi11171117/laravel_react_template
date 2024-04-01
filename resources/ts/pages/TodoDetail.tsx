import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import { TodoInputForUpdate } from '@/pages/TodoInputForUpdate';
import { useFetchTodo } from '@/pages/useFetchTodo';
import { useUpdateTodo } from '@/pages/useUpdateTodo';
import { useStoreImageForTodo } from '@/pages/useStoreImageForTodo';
import { useUpdateImageForTodo } from '@/pages/useUpdateImageForTodo';
import { useDeleteImageForTodo }  from '@/pages/useDeleteImageForTodo';
import { useStorePDFForTodo } from '@/pages/useStorePDFForTodoMutation';
import { todosKeys } from '@/api/todos/todosKeys';

export const TodoDetail = () => {

  const location = useLocation();

  const todoId  = location.state.todoId as number;


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

  const [updatedFilename, setUpdatedFilename] = useState('');


  const handleUpdatedImageInfo = (title:string, filename:string) => {
    setUpdatedTitle(title);
    setUpdatedFilename(filename);
    console.log(`updatedTitle: ${title}---updatedFilename: ${filename}`);
  };

  const queryClient = useQueryClient();

  const {todo, isLoading, isError} = useFetchTodo(todoId);

  const { updateTodoMutateAsync } = useUpdateTodo();

  const { storeImageForTodoMutateAsync } = useStoreImageForTodo();

  const { updateImageForTodoMutateAsync } = useUpdateImageForTodo();

  const { deleteImageForTodoMutateAsync } = useDeleteImageForTodo();

  const { storePDFForTodoMutateAsync } = useStorePDFForTodo();

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
      await updateTodoMutateAsync({name,content,todoId});

      await queryClient.invalidateQueries({queryKey: todosKeys.each});

    } catch (error) {
      console.error('Todoの更新に失敗しました:', error);
    }
  }

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
      
      await storeImageForTodoMutateAsync({title,filename,image,todoId});
      
      await queryClient.invalidateQueries({queryKey: todosKeys.each})

      setImage(null);
      setTitle('');
      setFileName('');

    } catch (error) {
      console.error('Todoの画像保存に失敗しました:', error);
    }
  }

  const handlePDFForTodoStorage = async (todo:Todo) => {
    try {

      const todoContent = todo.content;
      const todoId = todo.id;

      await storePDFForTodoMutateAsync({todoContent,todoId});
      
      await queryClient.invalidateQueries({queryKey: ['todo']})

    } catch (error) {
      console.error('pdfの作成に失敗しました:', error);
    }
  }

  const handleImageForTodoUpdate = async (todoId:number,imageId:number) => {
    try {

      if(updatedTitle.length > 10){
        console.log(updatedTitle.length)
        alert("名前は必ず10文字以下にして下さい");
        return;
      }

      if (!/\.(jpg|jpeg|png)$/i.test(updatedFilename)) {
        alert('有効なファイル形式は .jpg, .jpeg, .png です。');
        return;
      }

      if(updatedFilename.length > 50){
        alert("imageFileNameは必ず50文字以下にして下さい");
        return;
      }

      await updateImageForTodoMutateAsync({updatedTitle, updatedFilename, image, todoId,imageId});
      
      await queryClient.invalidateQueries({queryKey: todosKeys.each})

      setImage(null);

    } catch (error) {
      console.error('画像テーブルデータ更新に失敗しました:', error);
    }
  }

  const handleImageForTodoDeletion = async (todoId:number,imageId:number) => {
    try {

      await deleteImageForTodoMutateAsync({todoId,imageId});
      
      await queryClient.invalidateQueries({queryKey: todosKeys.each})

    } catch (error) {
      console.error('画像テーブルデータ削除に失敗しました:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if(todo === undefined) return <div>data is undefined</div>

  //const todo = data;
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
      <br/>
      <div>
        <button onClick={() => handlePDFForTodoStorage(todo)}>PDF作成</button>
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
          <label htmlFor="image">画像</label>
          <input onChange={handleImageCreation} type="file" id="image" name="image" required accept="image/png, image/jpeg, image/jpg" />
          <TodoInputForUpdate  updatedTitle = {updatedTitle} updatedFilename = {updatedFilename} title = {imageInfo.title} filename = {imageInfo.rawFilename} handleOnClick= {handleUpdatedImageInfo} 
          setUpdatedTitle = { setUpdatedTitle } setUpdatedFilename = { setUpdatedFilename } />
          <button onClick={() => handleImageForTodoUpdate(todo.id,imageInfo.id)} type="button">更新する</button>
          <br/>
          <button onClick={() => {handleImageForTodoDeletion(todo.id,imageInfo.id); console.log(imageInfo.id)}} type="button">削除する</button>
        </div>
      ))}
    </div>
  )
}

