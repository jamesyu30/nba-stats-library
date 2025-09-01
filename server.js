import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // tighten to https://your-frontend.onrender.com
  credentials: true
}));
app.use(express.json())

const SEASON = '2024-25' //default season for active players

async function getRandomPlayer(){
  try {
    const minSeason = 1980; //minimum season for random selection
    const currentSeason = 2025 //current season
    const randSeason = Math.floor(Math.random() * (currentSeason - minSeason + 1)) + minSeason //GETS RANDOM SEASON
    const url = `https://stats.nba.com/stats/playerindex?Active=&AllStar=&College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=&LeagueID=00&Season=${randSeason}&TeamID=0&Weight=`
    const response = await fetch(url, {
      headers: { //VERY IMPORTANT, unable to fetch data without this header
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })
    const data = await response.json()

    const randPlayer = Math.floor(Math.random() * data.resultSets[0].rowSet.length)
    const parsed = data.resultSets[0].rowSet[randPlayer] //parsed data set to get the player object

    //player object for the player of the day card
    const teamAbbr = parsed[9] ?? null
    const playerData = {
      id: parsed[0], //player id
      name: parsed[2] + " " + parsed[1] ?? "N/A" , //full name
      team: parsed[7] + " " + parsed[8] ?? "N/A", //team name
      logo: teamAbbr ? `https://raw.githubusercontent.com/gtkacz/nba-logo-api/main/icons/${teamAbbr.toLowerCase()}.svg` : null, //team logo
      draft_info: `Drafted Rd ${parsed[17] ?? "N/A"}, Pick ${parsed[18] ?? "N/A"} in the ${parsed[16] ?? "N/A"} Draft`,
      jersey: parsed[10] ?? "N/A", //jersey number
      position: parsed[11] ?? "N/A", //player position (pg, sf, c, etc)
      ppg: parsed[22] ?? 0, //points per game
      rpg: parsed[23] ?? 0, //rebounds per game
      apg: parsed[24] ?? 0, //assists per game
      title: "Player of the Day", //title for the card
      season: `${randSeason}/${randSeason + 1} season` //season
    }
    return playerData

  } catch (error) {
    console.error('fetch error:', error)
    return { error: error.message }
  }
}

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000
let currentPlayer = null //current player of the day
let timeReset = 0 //when the player was last fetched
//calls nba api(player index endpoint)
app.get('/api/player-of-the-day/', async (req, res) => {
  if (currentPlayer && (Date.now() - timeReset) < TWENTY_FOUR_HOURS) {
    return res.json({ player: currentPlayer })
  }
  const player = await getRandomPlayer()
  currentPlayer = player
  timeReset = Date.now()
  return res.json({ player: currentPlayer })
})

const nbaTeamIds = [
  1610612737, //Atlanta Hawks
  1610612738, //Boston Celtics
  1610612751, //Brooklyn Nets
  1610612766, //Charlotte Hornets
  1610612741, //Chicago Bulls
  1610612739, //Cleveland Cavaliers
  1610612742, //Dallas Mavericks
  1610612743, //Denver Nuggets
  1610612765, //Detroit Pistons
  1610612744, //Golden State Warriors
  1610612745, //Houston Rockets
  1610612754, //Indiana Pacers
  1610612746, //Los Angeles Clippers
  1610612747, //Los Angeles Lakers
  1610612763, //Memphis Grizzlies
  1610612748, //Miami Heat
  1610612749, //Milwaukee Bucks
  1610612750, //Minnesota Timberwolves
  1610612740, //New Orleans Pelicans
  1610612752, //New York Knicks
  1610612760, //Oklahoma City Thunder
  1610612753, //Orlando Magic
  1610612755, //Philadelphia 76ers
  1610612756, //Phoenix Suns
  1610612757, //Portland Trail Blazers
  1610612758, //Sacramento Kings
  1610612759, //San Antonio Spurs
  1610612761, //Toronto Raptors
  1610612762, //Utah Jazz
  1610612764  //Washington Wizards
];

const nbaTeams = [
  { id: 1610612737, name: "Atlanta Hawks" },
  { id: 1610612738, name: "Boston Celtics" },
  { id: 1610612751, name: "Brooklyn Nets" },
  { id: 1610612766, name: "Charlotte Hornets" },
  { id: 1610612741, name: "Chicago Bulls" },
  { id: 1610612739, name: "Cleveland Cavaliers" },
  { id: 1610612742, name: "Dallas Mavericks" },
  { id: 1610612743, name: "Denver Nuggets" },
  { id: 1610612765, name: "Detroit Pistons" },
  { id: 1610612744, name: "Golden State Warriors" },
  { id: 1610612745, name: "Houston Rockets" },
  { id: 1610612754, name: "Indiana Pacers" },
  { id: 1610612746, name: "Los Angeles Clippers" },
  { id: 1610612747, name: "Los Angeles Lakers" },
  { id: 1610612763, name: "Memphis Grizzlies" },
  { id: 1610612748, name: "Miami Heat" },
  { id: 1610612749, name: "Milwaukee Bucks" },
  { id: 1610612750, name: "Minnesota Timberwolves" },
  { id: 1610612740, name: "New Orleans Pelicans" },
  { id: 1610612752, name: "New York Knicks" },
  { id: 1610612760, name: "Oklahoma City Thunder" },
  { id: 1610612753, name: "Orlando Magic" },
  { id: 1610612755, name: "Philadelphia 76ers" },
  { id: 1610612756, name: "Phoenix Suns" },
  { id: 1610612757, name: "Portland Trail Blazers" },
  { id: 1610612758, name: "Sacramento Kings" },
  { id: 1610612759, name: "San Antonio Spurs" },
  { id: 1610612761, name: "Toronto Raptors" },
  { id: 1610612762, name: "Utah Jazz" },
  { id: 1610612764, name: "Washington Wizards" }
];

const teamIdMap = new Map(nbaTeams.map(t => [t.id, t.name]));

function teamIdtoName(id){
  if (id == null) return "Unknown Team";
  return teamIdMap.get(Number(id)) || "Unknown Team";
}

async function getRandomTeam(){
  try{
    const randTeam = nbaTeamIds[Math.floor(Math.random() * nbaTeamIds.length)];
    const url = `https://stats.nba.com/stats/teamdetails?TeamID=${randTeam}`
    const response = await fetch(url, {
      headers: { //VERY IMPORTANT, unable to fetch data without this header
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })
    const data = await response.json()
    const parsed = data.resultSets[0].rowSet[0] //parsed data

    const teamData = {
      id: randTeam,
      name: parsed[4] + " " + parsed[2] + " (" + parsed[1] + ")",
      arena: parsed[5] + " (Capacity: " + parsed[6] + ")",
      owner: parsed[7],
      generalManager: parsed[8],
      headCoach: parsed[9],
      yearFounded: parsed[3],
      abv: parsed[1].toLowerCase(),
      title: "Team of the Day",
      gleague: parsed[10]
    }
    return teamData
  }
  catch (error){
    console.error('Error fetching random team:', error)
    return { error: error.message }
  }
}

let currentTeam = null //current team of the day
let timeResetTeam = 0 //when the team was last fetched
app.get('/api/team-of-the-day/', async (req, res) => {
  if (currentTeam && (Date.now() - timeResetTeam) < TWENTY_FOUR_HOURS){
    return res.json({ team: currentTeam })
  }
  const team = await getRandomTeam()
  currentTeam = team
  timeResetTeam = Date.now()
  return res.json({ team: currentTeam })
})

const TWELVE_HOURS = 12 * 60 * 60 * 1000
let cachedIds = null //array of objects
let idsCachedAt = 0

app.get('/api/active-player-ids', async (req, res) => {
  try{
    if (cachedIds && (Date.now() - idsCachedAt) < TWELVE_HOURS){
      return res.json({ cachedIds })
    }

    const url = `https://stats.nba.com/stats/playerindex?Active=&AllStar=&College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=&LeagueID=00&Season=${SEASON}&TeamID=0&Weight=` 
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })

    const data = await response.json()
    const parsed = data.resultSets[0].rowSet
    const dataArr = [] //array of player data objects
    for(let i = 0; i < parsed.length; i++){
      
      const playerData = {
        id: parsed[i][0], //player id
        name: parsed[i][2] + " " + parsed[i][1] ?? "N/A" , //full name
        team: parsed[i][7] + " " + parsed[i][8] ?? "N/A", //team name
        ppg: parsed[i][22] ?? 0, //points per game
        rpg: parsed[i][23] ?? 0, //rebounds per game
        apg: parsed[i][24] ?? 0, //assists per game
        position: parsed[i][11] ?? "N/A",
        college: parsed[i][14] ?? "N/A",
        country: parsed[i][15] ?? "N/A"
      }
      dataArr.push(playerData)
    }
    //const rows = json.resultSets?.[0]?.rowSet || []
    //const ids = Array.from(new Set(rows.map(row => Number(row[0]).valueOf()).filter(Boolean)))

    cachedIds = dataArr
    idsCachedAt = Date.now()

    return res.json(dataArr)
  } catch (err){
    console.error('active ids fetch error', err)
    return res.status(500).json({ error: err.message })
  }
})
{/*https://stats.nba.com/stats/playerawards?PlayerID=2544*/}

app.get('/api/player-bio/:id', async (req, res) => {
  try{
    const id = Number(req.params.id)
    const url = `https://stats.nba.com/stats/commonplayerinfo?LeagueID=&PlayerID=${id}`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })
    const data = await response.json()
    {/* Player Bio Data */}
    const parsed = data.resultSets[0].rowSet[0]

    const url2 = `https://stats.nba.com/stats/playerawards?PlayerID=${id}`
    const response2 = await fetch(url2, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })
    const data2 = await response2.json()
    {/* Player Awards Data */}
    const parsed2 = data2.resultSets[0].rowSet
    let champ = 0;
    let mvpCount = 0;
    let allNbaCount = 0;
    let allStarCount = 0;
    for(const award of parsed2){
      switch(award[4]){
        case "NBA Champion":
          champ++;
          break;
        case "NBA Most Valuable Player":
          mvpCount++;
          break;
        case "All-NBA":
          allNbaCount++;
          break;
        case "NBA All-Star":
          allStarCount++;
          break;
      }
    }

    const playerData = {
      name: parsed[3],
      birthdate: parsed[7].slice(0, 9) ?? "N/A",
      school: parsed[8] ?? "N/A",
      country: parsed[9] ?? "N/A",
      height: parsed[11] ?? "N/A",
      weight: parsed[12] ?? "N/A",
      exp: parsed[13] ?? -1,
      jersey: parsed[14] ?? "N/A",
      position: parsed[15] ?? "N/A",
      teamId: parsed[18],
      team: parsed[20] ?? "N/A",
      draftInfo: "Rd " + (parsed[30] ?? "N/A, ") + ", Pick " + parsed[31] ?? "N/A",
      rings: champ,
      mvp: mvpCount,
      allNba: allNbaCount,
      allStar: allStarCount
    }

    return res.json({playerData})
  }
  catch (error){
    console.error('fetch error:', error)
    return res.status(500).json({ error: error.message })
  }
})

app.get('/api/season-stats/:id', async (req, res) => {
  try{
    const id = Number(req.params.id)
    const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${SEASON}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=&Weight=`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })

    const data = await response.json()
    const parsed = data.resultSets[0].rowSet
    for(const data of parsed){
      if(data[0] == id){
        const playerData = {
          age: data[5], 
          gp: data[6],
          record: data[7] + "-" + data[8],
          fgm: data[11],
          fga: data[12],
          fgPct: (data[13] * 100).toFixed(1) + "%",
          threePct: (data[16] * 100).toFixed(1) + "%",
          ftPct: (data[19] * 100).toFixed(1) + "%",
          reb: data[22],
          ast: data[23],
          tov: data[24],
          stl: data[25],
          blk: data[26],
          pts: data[30],
          plusMinus: data[31],
          fantasy: data[32]
        }
        return res.json({playerData})
      }
    }

    return res.json({})
  } catch (error){
    console.error('fetch error:', error)
    return res.status(500).json({ error: error.message })
  }
})

app.get('/api/season-stats-yoy/:id', async (req, res) => {
  try{
    const id = Number(req.params.id)
    const url = `https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID=${id}&PlusMinus=N&Rank=N&Season=${SEASON}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })

    const data = await response.json()
    const parsed = data.resultSets[1].rowSet
    const seasonArr = []
    {/* array of objects of season stats */}

    for(const seasonStats of parsed){
      const seasonData = {
        id: id,
        season: seasonStats[1],
        teamId: seasonStats[2],
        team: seasonStats[3] != null ? ((seasonStats[2] != -1) ? seasonStats[3] : "TOTAL") : "N/A",
        gp: seasonStats[5],
        record: seasonStats[6] + "-" + seasonStats[7],
        fgm: seasonStats[10],
        fga: seasonStats[11],
        fgPct: (seasonStats[12] * 100).toFixed(1) + "%",
        threePct: (seasonStats[15] * 100).toFixed(1) + "%",
        ftPct: (seasonStats[18] * 100).toFixed(1) + "%",
        reb: seasonStats[21],
        ast: seasonStats[22],
        tov: seasonStats[23],
        stl: seasonStats[24],
        blk: seasonStats[25],
        pts: seasonStats[29],
        plusMinus: seasonStats[30],
        fantasy: seasonStats[31]
      }
      seasonArr.push(seasonData)
    }

    return res.json(seasonArr)
  } catch (error){
    console.error('fetch error:', error)
    return res.status(500).json({ error: error.message })
  }
})

app.get('/api/team-info/:id', async(req, res) => {
  try{
    const id = Number(req.params.id)
    const url = `https://stats.nba.com/stats/teamdetails?TeamID=${id}`
    const response = await fetch(url, {
      headers: { //VERY IMPORTANT, unable to fetch data without this header
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    })
    const data = await response.json()
    const parsed = data.resultSets[0].rowSet[0] //parsed data
    const rings = data.resultSets[3].rowSet.length //number of championships won

    const teamData = {
      name: parsed[4] + " " + parsed[2],
      arena: parsed[5],
      owner: parsed[7],
      generalManager: parsed[8],
      headCoach: parsed[9],
      yearFounded: parsed[3],
      abv: parsed[1].toLowerCase(),
      gleague: parsed[10],
      championships: rings,
      facebook: data.resultSets[2].rowSet[0][1],
      insta: data.resultSets[2].rowSet[1][1],
      twitter: data.resultSets[2].rowSet[2][1]
    }

    return res.json({teamData})
  }
  catch (error){
    console.error('Error fetching random team:', error)
    return { error: error.message }
  }
})

app.get('/api/franchise-leaders/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const url = `https://stats.nba.com/stats/franchiseleaders?LeagueID=&TeamID=${id}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet[0];

    const franchiseData = {
      pts: parsed[1],
      ptsId: parsed[2],
      ptsName: parsed[3],
      ast: parsed[4],
      astId: parsed[5],
      astName: parsed[6],
      reb: parsed[7],
      rebId: parsed[8],
      rebName: parsed[9],
      blk: parsed[10],
      blkId: parsed[11],
      blkName: parsed[12],
      stl: parsed[13],
      stlId: parsed[14],
      stlName: parsed[15]
    };

    return res.json({franchiseData});
  } catch (error) {
    console.error('Error fetching franchise leaders:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/roster/:id', async(req, res) => {
  try {
    const id = Number(req.params.id);
    const url = `https://stats.nba.com/stats/commonteamroster?LeagueID=&Season=${SEASON}&TeamID=${id}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    const parsed2 = data.resultSets[1].rowSet; {/* coach data */}
    const teamRoster = [];
    const coaches = [];
    for(const player of parsed) {
      teamRoster.push({
        id: player[14],
        name: player[3],
        position: player[7],
        height: player[8],
        weight: player[9],
        age: player[11],
        acquired: player[15],
        experience: player[12]
      });
    }
    for(const coach of parsed2) {
      coaches.push({
        name: coach[5],
        role: coach[7],
        id: coach[2]
      });
    }
    return res.json({ teamRoster, coaches });
  } catch (error) {
    console.error('Error fetching roster:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/standings', async (req, res) => {
  try {
    const url = `https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=${SEASON}&SeasonType=Regular+Season&SeasonYear=`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    const west = parsed.filter(team => team[6] === 'West');
    const east = parsed.filter(team => team[6] === 'East');
    const westData = [];
    const eastData = [];
    let westPos = 0;
    for (const team of west) {
      westPos++;
      westData.push({
        pos: westPos,
        id: team[2],
        name: team[3] + " " + team[4],
        confR: team[7],
        record: team[17],
        winPercentage: team[15],
        homeR: team[18],
        awayR: team[19],
        L10: team[20],
        streak: team[37],
        streakInt: team[36],
        gb: team[38] == 0 ? "—" : team[38],
        playoffs: team[42],
        playin: team[43]
      });
    }
    let eastPos = 0;
    for (const team of east) {
      eastPos++;
      eastData.push({
        pos: eastPos,
        id: team[2],
        name: team[3] + " " + team[4],
        confR: team[7],
        record: team[17],
        winPercentage: team[15],
        homeR: team[18],
        awayR: team[19],
        L10: team[20],
        streak: team[37],
        streakInt: team[36],
        gb: team[38] == 0 ? "—" : team[38],
        playoffs: team[42],
        playin: team[43]
      });
    }

    return res.json({ west: westData, east: eastData });
  } catch (error) {
    console.error('Error fetching standings:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/allplayers', async (req, res) => {
  try {
    const url = `https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=${SEASON}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    const players = [];
    for(const p of parsed){
      players.push({
        id: p[0],
        name: p[2],
        years: "(" + p[4] + " - " + p[5] + ")"
      });
    }

    return res.json(players);
  } catch (error) {
    console.error('Error fetching all players:', error);
    return res.status(500).json({ error: error.message });
  }
});


app.get('/api/games', async (req, res) => {
  try {
    const { TeamID, VsTeamID, Season } = req.query;

    const seasonParam = Season || SEASON;

    const params = new URLSearchParams({
      Conference: '',
      Division: '',
      GameID: '',
      Outcome: '',
      LeagueID: '00',
      PORound: '',
      Season: seasonParam,
      SeasonSegment: '',
      SeasonType: 'Regular+Season'
    });

    if (TeamID !== undefined && TeamID !== '') params.set('TeamID', String(Number(TeamID)));
    if (VsTeamID !== undefined && VsTeamID !== '') params.set('VsTeamID', String(Number(VsTeamID)));

    const url = `https://stats.nba.com/stats/leaguegamefinder?Conference=&DateFrom=&DateTo=&Division=&GameID=&Outcome=&LeagueID=00&PORound=&Season=${Season}&SeasonSegment=&SeasonType=&TeamID=${Number(TeamID)}&VsTeamID=${Number(VsTeamID)}`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    const matches = [] //array of game objects

    for(const g of parsed) {
      let h = ""
      if(g[6].slice(4, 5) == '@'){
        h = "Away"
      }else{
        h = "Home"
      }
      matches.push({
        gameId: g[4],
        date: g[5],
        matchup: g[6],
        wl: g[7],
        homeScore: g[9],
        awayScore: g[9]-g[27],
        location: h
      });
    }

    return res.json(matches);
  } catch (error) {
    console.error('Error fetching games:', error);
    return res.status(500).json({ error: error.message });
  }
});

let homeTeamName = "";
let awayTeamName = "";
app.get('/api/boxscore/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = `https://stats.nba.com/stats/boxscoresummaryv2?GameID=${id}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    homeTeamName = teamIdtoName(data.resultSets[0].rowSet[0][6]);
    awayTeamName = teamIdtoName(data.resultSets[0].rowSet[0][7]);
    const time = data.resultSets[4].rowSet[0]; 
    const stats = data.resultSets[5].rowSet;
    const teamPointsTrimmed = []
    for(let i = 8; i <= 21; i++) {
      if(stats[0][i] > 0){
        teamPointsTrimmed.push(stats[0][i]);
      }
    }

    const oppTeamPointsTrimmed = []
    for(let i = 8; i <= 21; i++) {
      if(stats[1][i] > 0){
        oppTeamPointsTrimmed.push(stats[1][i]);
      }
    }

    const table_headers = ["Team", "Q1", "Q2", "Q3", "Q4", "OT1", "OT2", "OT3", "OT4", "OT5", "OT6", "OT7", "OT8", "OT9", "OT10"]

    const gameStats = {
      date: time[0],
      attendance: time[1],
      teamAbv: stats[0][4].toLowerCase(),
      teamName: stats[0][5] + " " + stats[0][6],
      teamRecord: stats[0][7],
      teamPoints: teamPointsTrimmed,
      totalPoints: stats[0][22],
      oppTeamAbv: stats[1][4].toLowerCase(),
      oppTeamName: stats[1][5] + " " + stats[1][6],
      oppTeamRecord: stats[1][7],
      oppTeamPoints: oppTeamPointsTrimmed,
      oppTotalPoints: stats[1][22],
      headers: table_headers.slice(0, teamPointsTrimmed.length + 1), //slices the headers array to match the number of quarters played
      homeTeamId: data.resultSets[0].rowSet[0][6],
      awayTeamId: data.resultSets[0].rowSet[0][7]
    }

    return res.json({ gameStats });
  } catch (error) {
    console.error('Error fetching boxscore:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/playergamestats/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = `https://stats.nba.com/stats/boxscoretraditionalv3?EndPeriod=1&EndRange=0&GameID=${id}&RangeType=0&StartPeriod=1&StartRange=0`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.boxScoreTraditional;
    const homePlayerStats = []
    const awayPlayerStats = []
    for (const player of parsed.homeTeam.players){
      let playerName = ""
      if(player.position){
        playerName = player.firstName + " " + player.familyName + " (" + player.position + ")"
      }else{
        playerName = player.firstName + " " + player.familyName
      }
      homePlayerStats.push({
        playerId: player.personId,
        playerName: playerName,
        minutes: player.statistics.minutes,
        points: player.statistics.points,
        assists: player.statistics.assists,
        rebounds: player.statistics.reboundsTotal,
        steals: player.statistics.steals,
        blocks: player.statistics.blocks,
        turnovers: player.statistics.turnovers,
        plusMinus: player.statistics.plusMinusPoints,
        fouls: player.statistics.foulsPersonal,
        fieldGoals: player.statistics.fieldGoalsMade + "-" + player.statistics.fieldGoalsAttempted,
        threePoints: player.statistics.threePointersMade + "-" + player.statistics.threePointersAttempted,
        freeThrows: player.statistics.freeThrowsMade + "-" + player.statistics.freeThrowsAttempted
      });
    }
    const homeTeamStats = {
      teamName: homeTeamName,
      fieldGoals: parsed.homeTeam.statistics.fieldGoalsMade + "-" + parsed.homeTeam.statistics.fieldGoalsAttempted,
      fieldGoalsPct: (parsed.homeTeam.statistics.fieldGoalsPercentage * 100).toFixed(1) + "%",
      threePoints: parsed.homeTeam.statistics.threePointersMade + "-" + parsed.homeTeam.statistics.threePointersAttempted,
      threePointsPct: (parsed.homeTeam.statistics.threePointersPercentage * 100).toFixed(1) + "%",
      freeThrows: parsed.homeTeam.statistics.freeThrowsMade + "-" + parsed.homeTeam.statistics.freeThrowsAttempted,
      freeThrowsPct: (parsed.homeTeam.statistics.freeThrowsPercentage * 100).toFixed(1) + "%",
      rebounds: parsed.homeTeam.statistics.reboundsTotal,
      offensiveRebounds: parsed.homeTeam.statistics.reboundsOffensive,
      assists: parsed.homeTeam.statistics.assists,
      steals: parsed.homeTeam.statistics.steals,
      blocks: parsed.homeTeam.statistics.blocks,
      turnovers: parsed.homeTeam.statistics.turnovers,
    };

    for(const player of parsed.awayTeam.players) {
      let playerName = ""
      if(player.position){
        playerName = player.firstName + " " + player.familyName + " (" + player.position + ")"
      }else{
        playerName = player.firstName + " " + player.familyName
      }
      awayPlayerStats.push({
        playerId: player.personId,
        playerName: playerName,
        position: player.position,
        minutes: player.statistics.minutes,
        points: player.statistics.points,
        assists: player.statistics.assists,
        rebounds: player.statistics.reboundsTotal,
        steals: player.statistics.steals,
        blocks: player.statistics.blocks,
        turnovers: player.statistics.turnovers,
        plusMinus: player.statistics.plusMinusPoints,
        fouls: player.statistics.foulsPersonal,
        fieldGoals: player.statistics.fieldGoalsMade + "-" + player.statistics.fieldGoalsAttempted,
        threePoints: player.statistics.threePointersMade + "-" + player.statistics.threePointersAttempted,
        freeThrows: player.statistics.freeThrowsMade + "-" + player.statistics.freeThrowsAttempted
      });
    }
    const awayTeamStats = {
      teamName: awayTeamName,
      fieldGoals: parsed.awayTeam.statistics.fieldGoalsMade + "-" + parsed.awayTeam.statistics.fieldGoalsAttempted,
      fieldGoalsPct: (parsed.awayTeam.statistics.fieldGoalsPercentage * 100).toFixed(1) + "%",
      threePoints: parsed.awayTeam.statistics.threePointersMade + "-" + parsed.awayTeam.statistics.threePointersAttempted,
      threePointsPct: (parsed.awayTeam.statistics.threePointersPercentage * 100).toFixed(1) + "%",
      freeThrows: parsed.awayTeam.statistics.freeThrowsMade + "-" + parsed.awayTeam.statistics.freeThrowsAttempted,
      freeThrowsPct: (parsed.awayTeam.statistics.freeThrowsPercentage * 100).toFixed(1) + "%",
      offensiveRebounds: parsed.awayTeam.statistics.reboundsOffensive,
      rebounds: parsed.awayTeam.statistics.reboundsTotal,
      assists: parsed.awayTeam.statistics.assists,
      steals: parsed.awayTeam.statistics.steals,
      blocks: parsed.awayTeam.statistics.blocks,
      turnovers: parsed.awayTeam.statistics.turnovers,
    }

    return res.json({ homePlayerStats, awayPlayerStats, homeTeamStats, awayTeamStats });
  } catch (error) {
    console.error('Error fetching player game stats:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/players-by-season/:season', async(req, res) => {
  const { season } = req.params;
  try {
    const response = await fetch(`https://stats.nba.com/stats/playerindex?LeagueID=00&Season=${season}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet
    const names = []
    for(const player of parsed) {
      names.push({
        id: player[0],
        name: player[2] + " " + player[1]
      })
    }
    return res.json({ names });
  } catch (error) {
    console.error('Error fetching players by season:', error);
    return res.status(500).json({ error: error.message });
  }
})

app.get('/api/compare', async (req, res) => {
  try {
    const { player1Id, player2Id, season } = req.query;

    if (!player1Id || !player2Id) {
      return res.status(400).json({ error: 'Please provide two player IDs for comparison.' });
    }

    const url = `https://stats.nba.com/stats/playercompare?Conference=&DateFrom=&DateTo=&Division=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerIDList=${player1Id}&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=&VsPlayerIDList=${player2Id}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    
    let p1stats = {};
    let p2stats = {};
    p1stats = {
      mins: parsed[0][2].toFixed(1),
      pts: parsed[0][22],
      fgm: parsed[0][3],
      fga: parsed[0][4],
      fgPct: (parsed[0][5] * 100).toFixed(1) + "%",
      threePm: parsed[0][6],
      threePa: parsed[0][7],
      threePct: (parsed[0][8] * 100).toFixed(1) + "%",
      ftM: parsed[0][9],
      ftA: parsed[0][10],
      ftPct: (parsed[0][11] * 100).toFixed(1) + "%",
      oRebs: parsed[0][12],
      dRebs: parsed[0][13],
      totalRebs: parsed[0][14],
      assists: parsed[0][15],
      turnovers: parsed[0][16],
      steals: parsed[0][17],
      blocks: parsed[0][18]
    }

    for(const p2 of parsed[1]){
      //console.log(p2[2])
      p2stats = {
        mins: parsed[1][2].toFixed(1),
        pts: parsed[1][22],
        fgm: parsed[1][3],
        fga: parsed[1][4],
        fgPct: (parsed[1][5] * 100).toFixed(1) + "%",
        threePm: parsed[1][6],
        threePa: parsed[1][7],
        threePct: (parsed[1][8] * 100).toFixed(1) + "%",
        ftM: parsed[1][9],
        ftA: parsed[1][10],
        ftPct: (parsed[1][11] * 100).toFixed(1) + "%",
        oRebs: parsed[1][12],
        dRebs: parsed[1][13],
        totalRebs: parsed[1][14],
        assists: parsed[1][15],
        turnovers: parsed[1][16],
        steals: parsed[1][17],
        blocks: parsed[1][18]
      }
    }
    return res.json({ p1stats, p2stats });
  } catch (error) {
    console.error('Error fetching player comparison stats:', error);
    return res.status(500).json({ error: error.message });
  }
});

//CAN GET ADVANCED STATS IN FUTURE BY CHANGING URL
app.get('/api/playerstats/', async (req, res) => {
  try {
    const { seasonType, perMode, season } = req.query;
    const response = await fetch(`https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=${perMode}&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=${seasonType}&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=&Weight=`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
        'Origin': 'https://www.nba.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();
    const parsed = data.resultSets[0].rowSet;
    const playerData = []
    for (const player of parsed){
      playerData.push({
        id: player[0],
        name: player[1],
        teamId: player[3],
        team: player[4],
        age: player[5],
        gp: player[6],
        mins: player[10].toFixed(1),
        fgm: player[11],
        fga: player[12],
        fgPct: (player[13] * 100).toFixed(1) + "%",
        fg3m: player[14],
        fg3a: player[15],
        fg3Pct: (player[16] * 100).toFixed(1) + "%",
        ftm: player[17],
        fta: player[18],
        ftPct: (player[19] * 100).toFixed(1) + "%",
        oreb: player[20],
        dreb: player[21],
        reb: player[22],
        ast: player[23],
        tov: player[24],
        stl: player[25],
        blk: player[26],
        pts: player[30],
      });
    }

    return res.json(playerData);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('NBA Stats API is running!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})