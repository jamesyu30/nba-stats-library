import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Card from './components/Card.jsx'
import Table from './components/Table.jsx'
import About from './components/About.jsx'

function App(){
  const [potd, setPotd] = useState(null) //player of the day
  const [totd, setTotd] = useState(null) //team of the day
  const [activePlayers, setActivePlayers] = useState([]) //active players
  const [pageNum, setPageNum] = useState(1) //current page number of active players table
  const [sortCol, setSortCol] = useState('') //column to be sorted
  const [sortOrder, setSortOrder] = useState('') //asc or desc
  const [lastCol, setLastCol] = useState('') //keeps track of last col so the cols reset correctly

  const PER_PAGE = 25 //rows per page
  const totalPages = Math.ceil(activePlayers.length / PER_PAGE)
  const startIndex = (pageNum - 1) * PER_PAGE
  const pageItems = activePlayers.slice(startIndex, startIndex + PER_PAGE)

  function incrementPage(){
    setSortCol('') //resets sort between pages
    setSortOrder('')
    setPageNum(prevPage => Math.min(prevPage + 1, totalPages)) //handles last page case
  }

  function decrementPage(){
    setSortCol('') //resets sort between pages
    setSortOrder('')
    setPageNum(prevPage => Math.max(prevPage - 1, 1)) //handles page 1 case
  }

  function handleSort(column){
    if(column.toLowerCase() != lastCol){
      setSortOrder('desc')
    }
    else if(sortOrder == '' || sortOrder == 'asc'){
      setSortOrder('desc')
    }
    else{
      setSortOrder('asc')
    }
    setSortCol(column.toLowerCase())
    setLastCol(column.toLowerCase())
  }

  function dataSort(column, order, arr){ //column = what col to be sorted, order = asc/desc, arr = array to be sorted
      if(order != "" && column != ""){
        const sortedData = [...arr].sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]
        if (typeof(aValue) == 'number'){
          if (order === 'asc'){
            return aValue - bValue
          }
          else{
            return bValue - aValue
          }
        }
        else{
          const sa = String(aValue).toLowerCase()
          const sb = String(bValue).toLowerCase()
          if (order === 'desc'){
            return sa.localeCompare(sb)
          }
          else{
            return sb.localeCompare(sa)
          }
        }
      })
      return sortedData;
    }
    return arr;
  }


  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/player-of-the-day/`)
      const data = await response.json()
      setPotd(data.player)
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchTeamData(){
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team-of-the-day/`)
      const data = await response.json()
      setTotd(data.team)
    }
    fetchTeamData();
  }, [])

  useEffect(() => {
    async function fetchPlayerData(){
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/active-player-ids/`)
      const data = await response.json()
      setActivePlayers(data.cachedIds)
    }
    fetchPlayerData();
  }, [])

  const sortedPlayers = dataSort(sortCol, sortOrder, pageItems)

  return (
    <>
      <Navbar />
      <div className="featured">

        {potd ? <Card name={potd.name} id={potd.id} team={potd.team} draftInfo={potd.draft_info} jersey={potd.jersey}
          position={potd.position} ppg={potd.ppg} apg={potd.apg} rpg={potd.rpg} title={potd.title} season={potd.season} logo={potd.logo} />
          : <p>Loading...</p>}

          {totd ? <Card name={totd.name} arena={totd.arena} owner={totd.owner} headCoach={totd.headCoach} gleague={totd.gleague}
          yearFounded={totd.yearFounded} generalManager={totd.generalManager} abv={totd.abv} title={totd.title} />
          : <p>Loading...</p>}
      </div>
      <div className="ActivePlayers">
        {activePlayers.length > 0 ? <Table data={sortedPlayers} header={["Name", "Team", "College", "Position", "Country", "PPG", "RPG", "APG"]} title={"Active Players"}
        page={pageNum} incrementPage={incrementPage} decrementPage={decrementPage} totalPages={totalPages} type="active" sortOrder={sortOrder} sortCol={sortCol} handleSort={handleSort} />
         : <p>Loading...</p>}
      </div>
    </>
  )
}

export default App
