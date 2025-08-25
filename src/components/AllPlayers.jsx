import Navbar from "./Navbar";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllPlayers() {
    const [players, setPlayers] = useState([]);
    const [pgNum, setPageNum] = useState(1);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/allplayers`);
            const data = await response.json();
            setPlayers(data);
        };
        fetchPlayers();
    }, []);

    function handleQuery(event){
        const val = event.target.value;
        setQuery(val);
        setPageNum(1);
    }

    function searchPlayers(query){
        if(!query){ //dont filter if query is empty
            return players;
        }
        return players.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }

    const filteredPlayers = searchPlayers(query);
    const PER_PAGE = 25 //rows per page
    const totalPages = Math.ceil(filteredPlayers.length / PER_PAGE)
    const startIndex = (pgNum - 1) * PER_PAGE
    const pageItems = filteredPlayers.slice(startIndex, startIndex + PER_PAGE)

  return (
    <div>
      <Navbar />
      <section className="players_page">
        <div style={{ flex: "0 0 320px", display: "flex", justifyContent: "flex-end" }}>
          <input
            placeholder="Search players..."
            value={query}
            onChange={handleQuery}
            style={{
              width: "100%",
              maxWidth: 320,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              boxSizing: "border-box",
              marginTop: "1rem",
              marginRight: "1rem"
            }}
          />
        </div>
      <h2 className="players_title" style={{textAlign: "center"}}>Players</h2>

      <div className="players_list">

        {players && pageItems.map((p) => (
          <Link key={p.id} to={p.id ? `/players/${p.id}` : "#"} className="player_card">
            <div className="player_info">
              <div className="player_name" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{p.name}</div>
              <div className="player_years">{p.years}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
        <div className="nav_btn_players">
                <button className="prev" onClick={() => setPageNum(pgNum - 1)} disabled={pgNum === 1}></button>
                    <span>Page {pgNum} / {totalPages}</span>
                <button className="next" onClick={() => setPageNum(pgNum + 1)} disabled={pgNum === totalPages}></button>
        </div>
    </div>
  );
}