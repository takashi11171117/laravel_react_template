import React from 'react'
import { Home } from '@/pages/Home'
import { Page1 } from '@/pages/Page1'
import { Page2 } from '@/pages/Page2'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/auth/Login'
import { Page404 } from '@/pages/Page404'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default AppRouter
