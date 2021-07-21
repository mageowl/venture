const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("u not playing. go play");
});

io.on("connection", () => {
	console.log("hello world");
});

server.listen(port);
