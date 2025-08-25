import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import About from './components/About.jsx';
import PlayerProfile from './components/PlayerProfile.jsx';
import TeamProfile from './components/TeamProfile.jsx';
import Standings from './components/Standings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/players/:id',
    element: <PlayerProfile />,
  },
  {
    path: '/team/:id',
    element: <TeamProfile />,
  },
  {
    path: '/standings',
    element: <Standings />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
