const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Send index.html for any room URL
app.get('/room/:roomId', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for the user joining a specific room
  socket.on('join room', (roomId) => {
    socket.join(roomId);  // Join the specified room
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for chat messages in a room
  socket.on('chat message', (msg, roomId) => {
    // Send the message to everyone in the specified room
    io.to(roomId).emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
