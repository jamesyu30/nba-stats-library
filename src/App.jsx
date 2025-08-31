import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router'
import Navbar from './components/Navbar.jsx'
import Card from './components/Card.jsx'
import Table from './components/Table.jsx'
import About from './components/About.jsx'
import LoadingCard from './components/LoadingCard.jsx'

function App(){
  const [potd, setPotd] = useState(null) //player of the day
  const [totd, setTotd] = useState(null) //team of the day
  const [activePlayers, setActivePlayers] = useState([]) //active players
  const [pageNum, setPageNum] = useState(1) //current page number of active players table
  const [sortCol, setSortCol] = useState('') //column to be sorted
  const [sortOrder, setSortOrder] = useState('') //asc or desc
  const [lastCol, setLastCol] = useState('') //keeps track of last col so the cols reset correctly
  const [totalPages, setTotalPages] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['favPlayer', 'favTeam', 'firstVisit']);
  const [showWelcome, setShowWelcome] = useState(!cookies.firstVisit) //firstvisit defaults to undefined/false

  useEffect(() => {
    if (cookies.favPlayer) setCookie('favPlayer', cookies.favPlayer, { path: '/'})
    if (cookies.favTeam) setCookie('favTeam', cookies.favTeam, { path: '/'})
  }, [cookies])

  const dismissWelcome = () => {
    setShowWelcome(false);
    setCookie('firstVisit', '1', { path: '/', maxAge: 60 * 60 * 24 * 365 }); //1 year
  };

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


  const PER_PAGE = 25 //rows per page
  const startIndex = (pageNum - 1) * PER_PAGE
  useEffect(() => {
      const tp = Math.max(0, Math.ceil(activePlayers?.length / PER_PAGE));
      setTotalPages(tp);

      const startIndex = (pageNum - 1) * PER_PAGE;
      setPageItems(activePlayers.slice(startIndex, startIndex + PER_PAGE));
    }, [activePlayers, pageNum, PER_PAGE]);

  const sortedPlayers = dataSort(sortCol, sortOrder, pageItems)

  return (
    <>
      <Navbar />
      {showWelcome && (
       <div className="welcome">
         <div className="welcome_popup">
           <h2>Welcome to NBA Stats Library</h2>
           <p>Thanks for stopping by! You may experience missing data or errors. If you do, refreshing the page may help. Otherwise, it may just be missing/incomplete data from the API or an issue on our end.</p>
           <button onClick={dismissWelcome} className='welcome_button'>Got it</button>
         </div>
       </div>
     )}

      <div className="featured">

        {potd ? <Link to={`/players/${potd.id}`} className='card_link'><Card name={potd.name} id={potd.id} team={potd.team} draftInfo={potd.draft_info} jersey={potd.jersey}
          position={potd.position} ppg={potd.ppg} apg={potd.apg} rpg={potd.rpg} title={potd.title} season={potd.season} logo={potd.logo} /></Link>
          : <LoadingCard />}

          {totd ? <Link to={`/team/${totd.id}`} className='card_link'><Card name={totd.name} arena={totd.arena} owner={totd.owner} headCoach={totd.headCoach} gleague={totd.gleague}
          yearFounded={totd.yearFounded} generalManager={totd.generalManager} abv={totd.abv} title={totd.title} /></Link>
          : <LoadingCard />}
      </div>
      <div className="ActivePlayers">
        {activePlayers?.length > 0 ? <Table data={sortedPlayers} header={["Name", "Team", "College", "Position", "Country", "PPG", "RPG", "APG"]} title={"Active Players"}
        page={pageNum} incrementPage={incrementPage} decrementPage={decrementPage} totalPages={totalPages} type="active" sortOrder={sortOrder} sortCol={sortCol} handleSort={handleSort} />
         : <LoadingCard />}
      </div>
    </>
  )
}

export default App
