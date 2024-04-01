import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const updateTodo: MutationFunction<void, { name: string; content: string; todoId:number }>
  = async (variables)=> {
  const { name, content, todoId } = variables;
  return axios
  .put(`http://localhost/api/todos/${todoId}`, {
    name: name,
    content: content,
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {console.log(error); alert(error.name.required)});
}