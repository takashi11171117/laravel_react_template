import { useLocation } from "react-router-dom";


export const TodoDetail = () => {

  const location = useLocation();

  const todo  = location.state.todo.todo

  return (
    <div>
      <h1>TodoDetail is here.</h1>
      <p>{todo.id}</p>
      <p>{todo.name}</p>
      <p>{todo.content}</p>
    </div>
  )
}