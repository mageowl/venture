import Player from "../objects/player.js";
import socket from "../../socket.js";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super("game");
	}

	preload() {
		this.load.spritesheet("skin.body.0", "textures/player/Body0.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.body.1", "textures/player/Body1.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.body.2", "textures/player/Body2.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.body.3", "textures/player/Body3.png", {
			frameWidth: 210,
			frameHeight: 340
		});

		this.load.spritesheet("skin.hair.0.0", "textures/player/Hair0-Color0.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.1.0", "textures/player/Hair1-Color0.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.2.0", "textures/player/Hair2-Color0.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.0.1", "textures/player/Hair0-Color1.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.1.1", "textures/player/Hair1-Color1.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.2.1", "textures/player/Hair2-Color1.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.0.2", "textures/player/Hair0-Color2.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.1.2", "textures/player/Hair1-Color2.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.hair.2.2", "textures/player/Hair2-Color2.png", {
			frameWidth: 210,
			frameHeight: 340
		});

		this.load.spritesheet("skin.pants.0", "textures/player/Pants0.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.pants.1", "textures/player/Pants1.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.pants.2", "textures/player/Pants2.png", {
			frameWidth: 210,
			frameHeight: 340
		});
		this.load.spritesheet("skin.pants.3", "textures/player/Pants3.png", {
			frameWidth: 210,
			frameHeight: 340
		});

		this.load.spritesheet("skin.shirt.0", "textures/player/Shirt0.png", {
			frameWidth: 210,
			frameHeight: 340
		});

		this.load.spritesheet("skin.eyes", "textures/player/Eyes.png", {
			frameWidth: 210,
			frameHeight: 340
		});

		this.load.image("map.tileset", "textures/map/Tileset.png");
		this.load.tilemapTiledJSON("map.island", "map/mainIsland.json");
	}

	create() {
		const skin = {
			body: 0,
			hairColor: 0,
			hairStyle: 1,
			pants: 1,
			shirt: 0
		};

		this.localPlayer = new Player({
			scene: this,
			x: 250,
			y: -100,
			connectionID: "local",
			texture: skin
		});
		socket.emit("join", { texture: skin });

		const externalPlayers = [];

		this.map = this.add.tilemap("map.island");
		this.map.addTilesetImage("blocks", "map.tileset");
		this.island = this.map
			.createLayer("ground", "blocks", 0, 0)
			.setCollisionByProperty({ collision: true })
			.setOrigin(0.5)
			.setScale(0.1);
		this.bg = this.map.createLayer("background", "blocks", 0, 0).setScale(0.1);

		this.physics.add.collider(this.localPlayer, this.island);

		this.cameras.main
			.setZoom(2.5)
			.startFollow(this.localPlayer, true, 0.2, 0.2);

		socket.on(
			"player-connect",
			([
				connectionID,
				{
					sprite: { texture }
				}
			]) => {
				externalPlayers.push(
					new Player({
						scene: this,
						x: 250,
						y: -100,
						connectionID,
						texture
					})
				);
			}
		);

		socket.on("server-update", (players) => {
			externalPlayers.forEach((player) => player.update(players));
		});
	}

	update() {
		this.localPlayer.update();

		socket.emit("update", {
			x: this.localPlayer.x,
			y: this.localPlayer.y,
			anim: this.localPlayer.animData
		});
	}
}
