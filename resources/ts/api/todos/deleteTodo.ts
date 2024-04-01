import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const deleteTodo: MutationFunction<void, { id:number }>
  = async (variables)=> {
  const { id } = variables;
  return axios
      .delete(`http://localhost/api/todos/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
}

/*

mutationFn: (id:number) => {
      return axios
      .delete(`http://localhost/api/todos/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    },
*/
