import axios from 'axios';

export const fetchTodos = async () => {
  try {
    const response = await axios.get('http://localhost/api/todos');
    return response.data.data.todos;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
}