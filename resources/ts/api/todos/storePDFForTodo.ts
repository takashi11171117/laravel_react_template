import axios from 'axios';
import { MutationFunction } from '@tanstack/react-query';

export const storePDFForTodo: MutationFunction<void, { todoContent: string; todoId:number}>
  = async (variables)=> {

  const { todoContent, todoId} = variables;

  const pdfFilename = `${todoContent}.pdf`;

  return axios
        .post(`http://localhost/api/todos/${todoId}/pdf`, { filename: pdfFilename })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {console.log(error); console.log(error.response.data); alert(error.response.data.message)});
  }

/* 
export const storePDFForTodo: MutationFunction<void, { todo: Todo}>
  = async (todo:Todo)=> {

  const { todo } = variables;

  const pdfFilename = `${todo.content}.pdf`;

  return axios
        .post(`http://localhost/api/todos/${todo.id}/pdf`, { filename: pdfFilename })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {console.log(error); console.log(error.response.data); alert(error.response.data.message)});
  }
  */