
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');


const peerConnection = new RTCPeerConnection();


navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    })
    .catch(error => console.error('Error accessing local media: ', error));

peerConnection.ontrack = (event) => {
    const stream = event.streams[0];
    remoteVideo.srcObject = stream;
};


function sendMessage() {
    const messageInput = document.getElementById('chatInput');
    const message = messageInput.value;
    
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    messageInput.value = '';
}
