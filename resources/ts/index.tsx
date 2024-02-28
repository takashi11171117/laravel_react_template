import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import {BrowserRouter}  from 'react-router-dom'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="text-red">Hello World!</div>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
