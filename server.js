import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/players', (_req, res) => {
  res.json([
    { id: 1, name: 'Jalen Brunson', points: 20, assists: 5, rebounds: 3 },
    { id: 2, name: 'Player 2', points: 18, assists: 6, rebounds: 7 }
  ])
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})