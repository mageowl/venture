import Player from "../objects/player.js";

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
		this.player = new Player({
			scene: this,
			x: 250,
			y: -100,
			local: true,
			texture: {
				body: 3,
				hairColor: 1,
				hairStyle: 2,
				pants: 3,
				shirt: 0
			}
		});

		this.map = this.add.tilemap("map.island");
		this.map.addTilesetImage("blocks", "map.tileset");
		this.island = this.map
			.createLayer("ground", "blocks", 0, 0)
			.setCollisionByProperty({ collision: true })
			.setOrigin(0.5)
			.setScale(0.1);
		this.bg = this.map
			.createLayer("background", "blocks", 0, 0)
			.setScale(0.1)
			.setDepth(-1);

		this.physics.add.collider(this.player, this.island);

		this.cameras.main.setZoom(2.5).startFollow(this.player);
	}

	update() {
		this.player.update();
	}
}
