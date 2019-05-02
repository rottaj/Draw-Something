const Player = require('./models/Player')
const app = require('express')();
const http = require('http');
const socketIO = require("socket.io");
const cors = require('cors');
app.use(cors());


const server = http.createServer(app); // initialize server
const io = socketIO(server); // create socket using server ^


io.on("connection", socket => {
    socket.on('welcome.index', response => {
        console.log(response)
    })

    //socket.on('disconnect', () => console.log("Client disconnected"))
});

const port = 3000
server.listen(port, () => console.log(`Listening on port ${port}`));

/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})
*/

/*
  app.js is the entry point
  build models and controllers for backend
*/
app.get('/players', (req, res) => {
    Player.findAll()
        .then( players => {
            res.json(players)
        })
})

app.get('/players/:id', (req, res) => {
    Player.findByPk(req.params.id)
        .then( player => {
            res.json(player)
        })
})


const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize
 .authenticate()
 .then(() =>{
     console.log('connection established')
 })
 .catch(err => {
     console.log('unable to connect', err)
 })
