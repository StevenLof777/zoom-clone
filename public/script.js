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
});

// CAMERA DOESN'T LIKE socket.io
// peer.on('open'), id => {
//     console.log(id)
// }

// socket.emit('join-room', ROOM_ID);

// socket.on('user-connected', () => {
//     connectToNewUser();
// });


const connectToNewUser = () => {
    console.log('bruhhhhhhhhhhhhh');
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        // Pin to a grid on the html
        video.play();
    })
    videoGrid.append(video)
}