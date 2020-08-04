const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  console.log("connexion receive ");
  socket.on('disconnect', () => {
     console.log("logout");
  });
});

http.listen(3000, () => {
  console.log("Listenning at 3000");
});
