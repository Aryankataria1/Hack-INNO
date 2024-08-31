const socket = io();
const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

document.getElementById('send-button').onclick = () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', { message, receiverId: selectedReceiverId });
        messageInput.value = '';
    }
};

socket.on('chat message', function(msg) {
    // Display the message in the chat box
});
