import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('/users')
    return response
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}

export const UserPagination = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const USERS_PER_PAGES = 4

  const [currentPage, setCurrentPage] = useState(0)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  if (data === undefined) return <div>data is undefined</div>

  return (
    <div>
      <h1>User List</h1>
      <div>
        {data?.data.items
          .slice(
            currentPage * USERS_PER_PAGES,
            (currentPage + 1) * USERS_PER_PAGES,
          )
          .map((user: User) => (
            <div key={user.id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
      <span className="pt-12">
        TotalPage:{Math.trunc(data?.data.items.length / USERS_PER_PAGES) + 1}:
        CurrentPage {currentPage}
      </span>
      <div className="py-12">
        <button
          onClick={() => {
            if (currentPage > 0) setCurrentPage(currentPage - 1)
          }}
          className="rounded-md bg-blue-300  p-2 text-white">
          Previous Page
        </button>
        <button
          onClick={() => {
            if (currentPage < 2) setCurrentPage(currentPage + 1)
          }}
          className="ml-4 rounded-md bg-red-300  p-2 text-white">
          Next Page
        </button>
      </div>
    </div>
  )
}
