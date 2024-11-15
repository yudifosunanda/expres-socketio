const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const path = require('path');

const app = express();
const server = createServer(app);


// Serve static files from the root directory
app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});