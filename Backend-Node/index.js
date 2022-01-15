const express = require('express')
var cors = require('cors')
const app = express()
const port = 5001


app.use(cors())

app.get('Rooms', (req, res) => {
  res.send([{id: 1, capacity: 60}, {id: 2, capacity: 120}])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})