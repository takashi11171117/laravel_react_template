import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type User = {
  usedId: number
  name: string
  email: string
  email_verified_at: string
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost/api/users');
    return response.data.data;
  } catch (error) {
    console.error('データを取得できませんでした:', error);
    throw new Error('データの取得に失敗しました');
  }
}

export const UserPagination = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  })

  //1page当たりに表示させるUserの数
  const USERS_PER_PAGES = 4;
  // 現在のページ番号
  const [currentPage, setCurrentPage] = useState(0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  console.log(data);
  const { items } = data;
  console.log(items);
  const users = items;

  return (
    <div>
      <h1>User List</h1>
      {users.slice(currentPage * USERS_PER_PAGES, (currentPage + 1) * USERS_PER_PAGES).map((user: User) => (
        <div key={user.usedId}>
          <p>{user.usedId}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
      <span className="pt-12">TotalPage:{Math.trunc (users.length / USERS_PER_PAGES) + 1}: CurrentPage {currentPage}</span>
      <div className="py-12">
        <button onClick={()=>{if(currentPage > 0) setCurrentPage(currentPage - 1)}}
          className="rounded-md bg-blue-300  p-2 text-white">
          Previous Page
        </button>
        <button onClick={()=>{if(currentPage < 2) setCurrentPage(currentPage + 1)}}
          className="ml-4 rounded-md bg-red-300  p-2 text-white">
          Next Page
        </button>
      </div>
    </div>
  );
}