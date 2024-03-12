import { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Todo = {
  id: number
  name: string
  content: string
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

  const queryClient = useQueryClient();

  const fetchTodos = async (id:number) => {
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
    queryFn: () => fetchTodos(todoId)
  })

  const updateTodoMutation = useMutation({
    mutationFn: (id:number) => {
      return axios
        .patch(`http://localhost/api/todos/${id}`, {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const todo = data;

  /*
  更新の場合は、
  画面の名前、内容の入力欄に書き込んで更新したいtodoの下にある更新ボタンを押します
  */
  return (
    <div>
      <h1>TodoDetail is here.</h1>
      <label>名前:
        <input value={name} onChange={handleNameCreation} />
      </label>
      <label>内容:
        <input value={content} onChange={handleContentCreation} />
      </label>
      <div>
        <button onClick={() => handleTodoUpdate(todo.id)}>更新</button>
      </div>
      <p>名前: {todo.name}</p>
      <p>内容: {todo.content}</p>
    </div>
  )
}
