
// importing ./db file for using its results 
const connectToMongo = require('./db')

// calling connectToMongo() async function which is present in ./db for creating a database connection
connectToMongo();

const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

// setting port for our backend to run
const port = 5000

// middleWare - request handler
app.use(express.json())

// defualt endpoint that is localhost:5000/ 
app.get('/', (req, res) => {
  res.send('Hello Madhu!')
})

// endpoint for the authentication build using another file called auth present in ./routes 
app.use('/api/auth', require('./routes/auth'))

// endpoint for adding notes to database build using another file called notes present in ./routes
app.use('/api/notes', require('./routes/notes'))

// Listening to the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
