import { axios } from '@/lib/axios'
import { AxiosResponse } from 'axios'

type FetchTodosResponse = Record<'items', Todo[]>

export const fetchTodos = async () => {
  try {
    const response = await axios.get<FetchTodosResponse>('/todos')
    return response
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}

export const fetchTodosPaginated = async (page: number = 1, per_page: number = 3): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`/todos?per_page=${per_page}&page=${page}`);
    return response;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
};

export const fetchTodosPaginatedSorted = async (
  page: number = 1, 
  per_page: number = 3, 
  sortBy: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`/todos`,{params: {
      per_page: per_page,
      page: page,
      sort_by: sortBy,
      sort_order: sortOrder === 'desc' ? 'desc' : 'asc'
    }});
    return response;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
};

export const fetchTodosFiltered = async (
  keyword:string ): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`/todos`,{params: {
      keyword: keyword 
    }});
    return response;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
};

export const fetchTodosPaginatedSortedFiltered = async (
  page: number = 1, 
  per_page: number = 3, 
  sortBy: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc',
  keyword:string = ""): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`/todos`,{params: {
      per_page: per_page,
      page: page,
      sort_by: sortBy,
      sort_order: sortOrder === 'desc' ? 'desc' : 'asc',
      keyword:keyword
    }});
    return response;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
};