import axios from 'axios';

export const fetchTodo = async (id:number) => {
  try {
    const response = await axios.get(`http://localhost/api/todos/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
}