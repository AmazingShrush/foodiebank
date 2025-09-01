// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/globals.css'
import App from './App'
import Dashboard from './routes/Dashboard'
import AddItem from './routes/AddItem'
import List from './routes/List'
import Recipes from './routes/Recipes'
import { ensureAnonAuth } from './lib/firebase'

const qc = new QueryClient()
const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Dashboard /> },
    { path: 'add', element: <AddItem /> },
    { path: 'list', element: <List /> },
    { path: 'recipes', element: <Recipes /> },
  ]}
])

ensureAnonAuth().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <QueryClientProvider client={qc}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
})
