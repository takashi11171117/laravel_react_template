import { useState } from 'react'
import { useQueryClient  } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useFetchTodos } from '@/pages/useFetchTodos';
import { useCreateTodo } from '@/pages/useCreateTodo';
import { useDeleteTodo } from '@/pages/useDeleteTodo';
import { todosKeys } from '@/api/todos/todosKeys';

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

  const {todos, isLoading, isError} = useFetchTodos();
  
  const { createMutateAsync } = useCreateTodo();
  const createTodoMutateAsync = createMutateAsync;

  const { deleteMutateAsync } = useDeleteTodo();
  const deleteTodoMutateAsync = deleteMutateAsync;

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

      await createTodoMutateAsync({name,content});

      setName('');
      setContent('');

      await queryClient.invalidateQueries({queryKey: todosKeys.all});

    } catch (error) {
      console.error('Todoの作成に失敗しました:', error);
    }
  }

  const handleTodoDeletion = async (id:number) => {
    try {
      await deleteTodoMutateAsync({id});
      
      await queryClient.invalidateQueries({queryKey: todosKeys.all});

    } catch (error) {
      console.error('Todoの削除に失敗しました:', error);
    }
  }


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if(todos === undefined) return <div>data is undefined</div>

  /*
  新規作成の場合は、
  画面の名前、内容の入力欄に書き込んで作成ボタンを押します
  名前は１文字以上１０文字以下、内容は空欄でも構わずで５０字以内で書くように定めています
  削除の場合は、
  削除したいtodoの下にある削除ボタンを押します
  個々のtodoページに移動するには、
  名前をクリックすると、todo一覧から個々のtodoページに移動します
  更新の場合は、
  todo一覧から個々のtodoページに移動して、画面の名前と内容の入力欄に書き込んで、更新ボタンを押します
  入力情報のルールは新規作成と全く同じです。
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
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <div>
            <p>{todo.id}</p>
            <Link to={`/todos/${todo.id}`} state={{ todoId: todo.id }} >{todo.name}</Link>
            <p>{todo.content}</p>
          </div>
          <div>
            <button onClick={() => handleTodoDeletion(todo.id)}>削除</button>
          </div>
        </div>
      ))}
    </div>
  );
}