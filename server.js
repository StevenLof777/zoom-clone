const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const port = 3030;
const { v4: uuidv4 } = require('uuid');


// Must be requiring ExpressPeerServer incorrectly
// // ===================================================================================== 
// const { ExpressPeerServer } = require('peer');
// const peerServer = ExpressPeerServer(server, {
//     debug: true
// });
// // ===================================================================================== 

// Load the ejs module 
app.set('view engine', 'ejs')
// Public URL for script
app.use(express.static('public'));

// app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
    // Gets room id
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    // Passes uuid throught room endpoint 
    res.render('room', { roomId: req.params.room })
});


// // NOT CONNECTING 
// // ===================================================================================== 

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        console.log('joined room')
        // Joining the room based off of the unique id that is generated in the get request
        socket.join(roomId);
        // Notifies the user that someone joined the room
        socket.to(roomId).broadcast.emit('user-connected');
        
        // console.log('Joined room');
    })
})
// // ===================================================================================== 
server.listen(port, () => {
    console.log(`Server running. localhost:${port}`)
});
