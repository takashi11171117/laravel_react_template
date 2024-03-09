import React from 'react'
import { Home } from '@/pages/Home'
import { Page1 } from '@/pages/Page1'
import { Page2 } from '@/pages/Page2'
import { UserPagination } from '@/pages/UserPagination'
import { Routes, Route } from 'react-router-dom'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/users" element={<UserPagination />} />
    </Routes>
  )
}

export default AppRouter