export default function Table() {
    return (
        <section>
            <h2 className="section_header">Active Players</h2>
            <table className="stat_table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th className="numeric">Points</th>
                        <th className="numeric">Assists</th>
                        <th className="numeric">Rebounds</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jalen Brunson</td>
                        <td className="numeric">20</td>
                        <td className="numeric">5</td>
                        <td className="numeric">3</td>
                    </tr>
                    <tr>
                        <td>Jalen Brunson</td>
                        <td className="numeric">20</td>
                        <td className="numeric">5</td>
                        <td className="numeric">3</td>
                    </tr>
                    <tr>
                        <td>Jalen Brunson</td>
                        <td className="numeric">20</td>
                        <td className="numeric">5</td>
                        <td className="numeric">3</td>
                    </tr>
                    {/* Add more player rows as needed */}
                </tbody>
            </table>
            <div className="nav_btn">
                <button className="prev"></button>
                {/* put page number here */1}
                <button className="next"></button>
            </div>    
        </section>
    )
}
