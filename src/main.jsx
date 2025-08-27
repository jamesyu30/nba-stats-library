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
import Teams from './components/Teams.jsx';
import AllPlayers from './components/AllPlayers.jsx';
import Games from './components/Games.jsx';
import GamesProfile from './components/GamesProfile.jsx';

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
  },
  {
    path: '/teams',
    element: <Teams />,
  },
  {
    path: '/allplayers',
    element: <AllPlayers />,
  },
  {
    path: '/games',
    element: <Games />,
  },
  {
    path: '/games/:id',
    element: <GamesProfile />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
