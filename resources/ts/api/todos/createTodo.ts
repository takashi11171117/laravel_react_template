import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const createTodo: MutationFunction<void, { name: string; content: string }>
  = async (variables)=> {
  const { name, content } = variables;
  return axios.post('http://localhost/api/todos', {
    name: name,
    content: content,
  }).then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error);
  });
}