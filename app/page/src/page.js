import GameScene from "./classes/scenes/GameScene.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.RESIZE
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 400 }
		}
	},
	loader: {
		baseURL: "assets"
	},
	render: {
		antialias: false
	},
	scene: GameScene
});
