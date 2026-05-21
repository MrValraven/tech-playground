import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import ExperimentPage from './layout/ExperimentPage'
import { experiments } from './experiments'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={experiments[0]?.slug ?? '/'} replace /> },
      { path: ':slug', element: <ExperimentPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
