## 8/21/25
- Developed a nav bar with logo and nav elements
- Added daily feature cards template 
- Added table of active players with buttons to switch between pages

## 8/22/25
- Added data to the cards of the day

## 8/23/25
- Implemented table of active players with sorting feature and different pages
- Added routes using react router
- Added env file/changed some routes
- Started working on player profiles

## 8/24/25
- Finished player profile with current season stats and past season stats
- Added team profile with general team info, franchise leaders, and a table displaying the roster and coaches
- Created standings table

## 8/25/25
- Finished standings table with ability to switch conferences, streak indicators, and playoffs/playins indicators
- Implemented the team tab where you can see the list of all current teams separated by conference and division
- Added all players tab where you can see every NBA player and search by name

## 8/26/25
- Added games search tab
- Ability to search games by teams and season and displaying the filtered results to the page

## 8/27/25
- Started on game profile view
- Displays team names, logos, and records
- Added a table to view points by quarter

## 8/29/25
- Finished game profile viewer with box score by team
- Started working on player comparison tab
- Implemented season selection dropdown and player selection from within the season

## 8/30/25
- Completed comparison tab by displaying the stats from the API
- Implemented stats tab
- Player stats table with season, per mode, season type filters and ability to sort

## 8/31/25
- Added favorites tab where you can see your favorite team and player
- Added loading card
- Made site logo clickable
- Included hyperlinks to teams/players in games profile page
- Added welcome popup

NBA team logos from here: https://github.com/gtkacz/nba-logo-api
Player headshots from official NBA CDN
NBA api from here: https://github.com/swar/nba_api/tree/master

Thoughts:
- This website would be more responsive if I included a database for storing data from the api. That way it would completely negate the need to load data at some pages and result in less api calls. The reason why I did not use a database was because the website hosting service (heroku) has an ephemeral file system which makes sqlite3 (db I am familiar with) not work since it wipes any new data written every 24 hours. I had the option to use Postgresql with heroku, but I decided that the time it would take to learn would not be worth it since I am also learning react and express in this project.

- In the future, features I would add are adding new tabs since the API has many more endpoints that I did not touch, adding advanced/more detailed stats to some pages, move the data to a db, make it more mobile friendly, and draft data.

- Hardest part about this project was learning on the go. I came into this project with a beginner-level understanding of react and almost no experience in express, so a lot of the time was spent looking up documentation and searching for how I could implement this feature that I wanted. Some examples of that are the react router and cookies. I came into the project unaware of both packages, but I discovered that I need react router if I wanted client side navigation for my navbar as well as the links. I needed cookies to store some user personalization, mainly the favorites tab, because I did not have a db. API was a little hard to work with because of the documentation.
