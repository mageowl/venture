const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const players = {};

app.get("/", (req, res) => {
	res.send("u not playing. go play");
});

io.on("connection", (socket) => {
	socket.on("join", ({ texture }) => {
		Object.entries(players).forEach((player) =>
			socket.emit("player-connect", player)
		);

		players[socket.id] = {
			x: 0,
			y: 0,
			sprite: {
				texture
			}
		};
		socket.broadcast.emit("player-connect", [socket.id, players[socket.id]]);

		socket.on("update", (data) => {
			players[socket.id] = { ...players[socket.id], ...data };
			socket.emit(
				"server-update",
				Object.fromEntries(
					Object.entries(players).filter(([key]) => key !== socket.id)
				)
			);
		});
	});

	socket.on("disconnect", () => {
		delete players[socket.id];
		socket.broadcast.emit("player-disconnect");
	});
});

server.listen(port);
