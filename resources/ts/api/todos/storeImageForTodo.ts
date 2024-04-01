import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const storeImageForTodo: MutationFunction<void, { title: string; filename: string; image: File | null; todoId:number }>
  = async (variables)=> {

  const { title, filename, image, todoId } = variables;

  const formData = new FormData();
  if(image !== null){ 
    formData.append('image',image); 
    formData.append('title', title);
    formData.append('filename', filename);
  }

  return axios
  .post(`http://localhost/api/todos/${todoId}`, formData,{
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {console.log(error); console.log(error.response.data); alert(error.response.data.message)});

  }
