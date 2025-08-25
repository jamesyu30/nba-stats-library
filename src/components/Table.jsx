import { Link } from "react-router"

export default function Table(props) {
    return (
        <section>
            {(props.type !== "coaches" || props.type != "roster") ? <h2 className="section_header">{props.title}</h2> : <h2 className="section_header" style={{"margin-bottom": 0}}>{props.title}</h2>}

            {(props.type == "roster" || props.type == "coaches") && (
                <button className="rosterToggle" onClick={props.handleClick}>
                    {props.rosterToggle ? "Show Coaches" : "Show Roster"}
                </button>
            )}

            <table className={props.type == "active" ? "stat_table" : "yoy_table"}>

                <colgroup>{props.type =='active' && <><col style={{width:'25%'}}/><col style={{width:'18%'}}/><col style={{width:'14%'}}/><col style={{width:'11%'}}/><col style={{width:'10%'}}/><col style={{width:'7%'}}/><col style={{width:'7%'}}/><col style={{width:'8%'}}/></>}
                {/* styled like this to avoid hydration error    name                    team                      drafted from                 position                   country                      ppg                        rpg                              apg */}
                
                {props.type =='yoy' && <><col style={{width:'10%'}}/><col style={{width:'6%'}}/><col style={{width:'4%'}}/><col style={{width:'8%'}}/></>}
                
                {props.type =='roster' && <><col style={{width:'15%'}}/><col style={{width:'10%'}}/><col style={{width:'10%'}}/><col style={{width:'10%'}}/><col style={{width:'10%'}}/><col style={{width:'10%'}}/></>}
                {/* new col styling goes here */}
                </colgroup>
                <thead>
                    <tr>
                        {props.type == 'active' && props.header.map(header => {
                            const arrow = props.sortOrder === 'asc' ? '▲' : '▼'
                            return (
                                <th key={header} className="tableHeader" onClick={() => props.handleSort(header)}>
                                    {header} { props.sortCol == header.toLowerCase() ? (props.sortOrder === 'asc' ? '▲' : '▼') : '⇵'} {/* handles sorting arrows */}
                                </th>
                            )
                        })}

                        {(props.type == 'yoy' || props.type == "coaches" || props.type == "roster") && props.header.map(header => {
                            return (
                                <th key={header} className="tableHeader"> {header} </th>
                            )
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.type == 'active' && props.data.map(data => (
                        <tr key={data.id}>
                            <td className="active_name"><Link to={`/players/${data.id}`}>{data.name}</Link></td>
                            <td className="active_team">{data.team == "null null" ? "N/A" : data.team}</td>
                            <td className="active_college">{data.college}</td>
                            <td className="active_position">{data.position}</td>
                            <td className="active_country">{data.country}</td>
                            <td className="active_ppg">{data.ppg}</td>
                            <td className="active_rpg">{data.rpg}</td>
                            <td className="active_apg">{data.apg}</td>
                        </tr>
                    ))}

                    {props.type == 'yoy' && props.data.map(data => (
                        <tr key={data.id + 8}>
                            <td className="yoy_season">{data.season}</td>
                            {(data.teamId != -1 && data.team != "N/A") ? (
                                <td className="yoy_team"><Link to={`/team/${data.teamId}`}>{data.team}</Link></td>
                            ) : (
                                data.team == "N/A" ? <td className="yoy_team">N/A</td> : <td className="yoy_team">TOTAL</td>
                            )}
                            <td className="yoy_gp">{data.gp}</td>
                            <td className="yoy_record">{data.record}</td>
                            <td className="yoy_fgm">{data.fgm}</td>
                            <td className="yoy_fga">{data.fga}</td>
                            <td className="yoy_fgPct">{data.fgPct}</td>
                            <td className="yoy_threePct">{data.threePct}</td>
                            <td className="yoy_ftPct">{data.ftPct}</td>
                            <td className="yoy_pts">{data.pts}</td>
                            <td className="yoy_reb">{data.reb}</td>
                            <td className="yoy_ast">{data.ast}</td>
                            <td className="yoy_stl">{data.stl}</td>
                            <td className="yoy_blk">{data.blk}</td>
                            <td className="yoy_tov">{data.tov}</td>
                            <td className="yoy_plusMinus">{data.plusMinus}</td>
                            <td className="yoy_fantasy">{data.fantasy}</td>
                        </tr>
                    ))
                    }

                    {props.type == "coaches" && props.data.map((data) => (
                        <tr key={data.id}>
                            <td className="coaches_name">{data.name}</td>
                            <td className="coaches_position">{data.role}</td>
                        </tr>
                    ))}

                    {props.type == "roster" && props.data.map((data) => (
                        <tr key={data.id}>
                            <td className="roster_name"><Link to={`/players/${data.id}`}>{data.name}</Link></td>
                            <td className="roster_position">{data.position}</td>
                            <td className="roster_age">{data.age}</td>
                            <td className="roster_exp">{data.experience}</td>
                            <td className="roster_height">{data.height}</td>
                            <td className="roster_weight">{data.weight}</td>
                            <td className="roster_acquired">{data.acquired}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {props.type == "active" &&
            <div className="nav_btn">
                <button className="prev" onClick={props.decrementPage}></button>
                    <span>Page {props.page} / {props.totalPages}</span>
                <button className="next" onClick={props.incrementPage}></button>
            </div>
            }    
        </section>
    )
}
