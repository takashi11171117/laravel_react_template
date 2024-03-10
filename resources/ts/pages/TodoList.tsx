import { useState } from 'react'
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Todo = {
  id: number
  name: string
  content: string
}

export const TodoList = () => {

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

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost/api/todos');
      return response.data;
    } catch (error) {
      console.error('データを取得できませんでした:', error);
      throw new Error('データの取得に失敗しました');
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  const createTodoMutation = useMutation({
    mutationFn: () => {
      return axios.post('http://localhost/api/todos', {
        name: name,
        content: content,
      }).then((response) => {
        console.log(response)
      })
      .then(() => {
        setName('');
        setContent('');
      })
      .catch((error) => {
        console.log(error);
      });
    },
  })

  const handleTodoCreation = async () => {
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
      await createTodoMutation.mutateAsync();
      
      await queryClient.invalidateQueries({queryKey: ['todos']})

    } catch (error) {
      console.error('Todoの作成に失敗しました:', error);
    }
  }

  const updateTodoMutation = useMutation({
    mutationFn: (todo:Todo) => {
      return axios
        .patch(`http://localhost/api/todos/${todo.id}`, {
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

  const handleTodoUpdate = async (todo:Todo) => {
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
      if(content === ''){
        setContent(todo.content)
        console.log(content)
      }
      if(content.length > 50){
        alert("内容は必ず50文字以下にして下さい");
        return;
      }
      await updateTodoMutation.mutateAsync(todo);
      
      await queryClient.invalidateQueries({queryKey: ['todos']})

    } catch (error) {
      console.error('Todoの更新に失敗しました:', error);
    }
  }

  const deleteTodoMutation = useMutation({
    mutationFn: (id:number) => {
      return axios
      .delete(`http://localhost/api/todos/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    },
  });

  const handleTodoDeletion = async (id:number) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
      
      await queryClient.invalidateQueries({queryKey: ['todos']})

    } catch (error) {
      console.error('Todoの削除に失敗しました:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if(data === undefined) return <div>data is undefined</div>

  /*
  新規作成の場合は、
  画面の名前、内容の入力欄に書き込んで作成ボタンを押します
  名前は１文字以上１０文字以下、内容は空欄でも構わずで５０字以内で書くように定めています
  更新の場合は、
  画面の名前、内容の入力欄に書き込んで更新したいtodoの下にある更新ボタンを押します
  入力情報のルールは新規作成と全く同じです。
  削除の場合は、
  削除したいtodoの下にある削除ボタンを押します
  */
  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleTodoCreation}>作成</button>
      <label>名前:
        <input value={name} onChange={handleNameCreation} />
      </label>
      <label>内容:
        <input value={content} onChange={handleContentCreation} />
      </label>
      {data.map((todo: Todo) => (
        <div key={todo.id}>
          <div>
            <p>{todo.id}</p>
            <p>{todo.name}</p>
            <p>{todo.content}</p>
          </div>
          <div>
            <button onClick={() => handleTodoDeletion(todo.id)}>削除</button>
            <button onClick={() => handleTodoUpdate(todo)}>更新</button>
          </div>
        </div>
      ))}
    </div>
  );
}

