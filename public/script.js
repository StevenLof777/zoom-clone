const socket = io('/');
const clientVideo = document.createElement('video');
const videoGrid = document.querySelector('#video-grid');
// muting video upon arrival
clientVideo.muted = true;

// Don't need to create id 
let peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    // Load data from stream
    addVideoStream(clientVideo, stream);
    
    peer.on('call', call => {
        call.anser(stream)
        const video = documet.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    // When a new user is connected It will call the connectToNewUser fn
    socket.on('user-connected', () => {
        connectToNewUser(userId, stream);
    });
});

// CAMERA DOESN'T LIKE peer.on
// peer.on('open'), id => {
//     socket.emit('join-room', ROOM_ID);
// }




// When called this function will pass the userId and stream through the params to make a call
const connectToNewUser = (userId, stream) => {
    // Calls the other user, sends client's stream
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    // When user recieves a stream, the fn adds the video stream to videoGrid 
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    console.log('new user');
};

// const addVideoStream = (video, stream) => {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//         video.play()
//     })
//     videoGrid.append(video)
// }

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        // Pin to a grid on the html
        video.play();
    })
    videoGrid.append(video)
}