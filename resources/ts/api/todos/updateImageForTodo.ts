import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const updateImageForTodo: MutationFunction<void, { updatedTitle: string; updatedFilename: string; image: File | null; todoId:number,imageId: number }>
  = async (variables)=> {

    const { updatedTitle, updatedFilename, image, todoId, imageId } = variables;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };
  
    const formData = new FormData();
    
    if(image !== null){ 
      formData.append('image',image); 
      formData.append('title', updatedTitle);
      formData.append('filename', updatedFilename);

      return axios
      .post(`http://localhost/api/todos/${todoId}/${imageId}`, formData, config)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {console.log(error); alert(error.name.required)});
    }
    else{
      return axios
      .post(`http://localhost/api/todos/${todoId}/${imageId}`, {
        title: updatedTitle,
        filename: updatedFilename,
      } )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {console.log(error); alert(error.name.required)});
    }

  }
