import Navbar from "./Navbar"

export default function About() {
    return (
        <>
            <Navbar />
            <section className="about_section" style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
                <h1>About</h1>
                <p>Welcome! This is a project to showcase NBA player statistics using React with Expressjs as a backend. The application fetches data from the NBA API and displays it in a user-friendly format.
                    The goal is to provide an easy way for users to access and explore player stats, team information, and more. This current data was last updated for the <strong>2024-25 season</strong>. Feel free to browse through the different sections and enjoy the data! If you have any questions or feedback, please post
                    an issue on my Github repository found <a href="https://github.com/jamesyu30/nba-stats-library">here</a>.
                </p>

                <h2>Where did you get the data from?</h2>
                <p>The data is sourced from an open source NBA API, which provides comprehensive statistics and information about players, teams, and games. It could be found on github <a href="https://github.com/swar/nba_api/tree/master">here</a>.
                    <br />
                    <br />
                    The player headshots are fetched from the official NBA CDN, ensuring that the images are up-to-date and accurate. Team logos are sourced from a public repository on GitHub, which hosts a collection of NBA team logos in SVG format.
                    <br />
                    <br />
                    The player headshots are sourced from this link: https://cdn.nba.com/headshots/nba/latest/1040x760/(id).png, just replace (id) with the player's ID. If you are unsure how to find a player's ID, you can look at the URL when you click on a player's profile on NBA.com. For example, LeBron James' ID is 2544, which can be found in this URL: https://www.nba.com/player/2544/lebron-james.
                    <br />
                    <br />
                    The NBA team logos are found <a href="https://github.com/gtkacz/nba-logo-api">here</a>.
                </p>

                <h2>Why does the website sometimes break or take a long time to load data?</h2>
                <p>There are several reasons why the website may experience issues or delays in loading data:</p>
                <ul>
                    <li><strong>API Limitations:</strong> The NBA API has rate limits in place to prevent abuse. If too many requests are made in a short period, the API may temporarily block further requests, leading to delays or errors. The API also lacks data from some fields leading to incomplete or missing information and unintended functionality.</li>
                    <li><strong>Network Issues:</strong> Slow or unstable internet connections can affect the loading speed of the website and the API responses.</li>
                    <li><strong>Data Processing:</strong> The application may need to process large amounts of data before displaying it, which can take time and may cause the website to appear unresponsive.</li>
                </ul>

                <h2>Privacy / data usage</h2>
                <p>Short summary: this site does not collect or sell personal data. Details:</p>
                <ul>
                    <li><strong>What we store:</strong> only minimal client-side data such as localStorage favorites or UI preferences. No user accounts or emails are stored by default.</li>
                    <li><strong>Third-party data:</strong> player images and logos are loaded from external CDNs (NBA CDN, GitHub). Those requests may expose the user's IP to the CDN provider.</li>
                    <li><strong>Analytics:</strong> no analytics are enabled by default. If analytics are added, they will be disclosed here and users will be given an opt-out option.</li>
                    <li><strong>Cookies:</strong> the app may use session cookies or browser storage for UI state; nothing sensitive is stored.</li>
                    <li><strong>Data removal / contact:</strong> to request deletion of any server-stored data or report privacy concerns, open an issue or contact via the project GitHub: <a href="https://github.com/jamesyu30/nba-stats-library">github.com/jamesyu30/nba-stats-library</a>.</li>
                </ul>

                <h2>To Do:</h2>
                <ul>
                    <li>Ability to search for games by matchup and view them</li>
                    <li>Comparison between players?</li>
                    <li>Leaderboard for stats by season/all time</li>
                    <li>More advanced stats (PER, WS, BPM, VORP, etc.)</li>
                </ul>

                <p style={{ marginTop: '5rem', textAlign: 'center', fontStyle: 'italic', fontWeight: 'lighter', fontSize: '1rem' }}>Last updated: August 25 2025 7:30pm EST</p>
            </section>
        </>
    )
}
