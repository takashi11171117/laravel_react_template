import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const deleteImageForTodo: MutationFunction<void, { todoId:number,imageId: number }>
  = async (variables)=> {

    const { todoId, imageId } = variables;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };
  
    return axios
        .delete(`http://localhost/api/todos/${todoId}/${imageId}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {console.log(error); alert(error.name.required)});

  }
