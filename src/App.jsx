import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Card from './components/Card.jsx'
import Table from './components/Table.jsx'
import About from './components/About.jsx'

function App() {

  return (
    <>
      <Navbar />
      <div className="featured">
        <Card />
        <Card />
      </div>
      <div className="ActivePlayers">
        <Table />
      </div>
    </>
  )
}

export default App
