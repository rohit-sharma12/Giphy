import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layout/app-layouts';
import Category from './pages/category';
import Search from './pages/search';
import Favorites from './pages/favorites';
import Home from './pages/home';
import GifPage from './pages/single-gif';
import GifProvider from './context/context';

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:category',
        element: <Category />,
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/:type/:slug',
        element: <GifPage />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ]
  }
])
function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  )

}

export default App
