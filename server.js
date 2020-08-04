const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

class User {
  constructor(nom, id){
     this.nom = nom;
     this.id = id;
  }
}

const sockets = [];

let countConnection = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
  countConnection++;
  console.log("connexion receive ");
  sockets.push(new User(countConnection, socket.id));
  socket.on('disconnect', () => {
     console.log("logout");
  });
  socket.on('chat message', (msg) => {
    console.log(socket.id);
    const splits = msg.split(":");
    console.log('message: ' + msg);
    const user = sockets.find(u => u.nom == splits[0]);
    console.log(sockets);
    if(user){
      console.log(user.id);
      io.to(user.id).emit('chat message', splits[1]); 
    }

  });
});

http.listen(3000, () => {
  console.log("Listenning at 3000");
});
