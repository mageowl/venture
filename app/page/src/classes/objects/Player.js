export default class Player extends Phaser.GameObjects.Container {
	static anims = {
		IDLE: { frames: [0], speed: 0 },
		WALK: { frames: [1, 0], speed: 5 },
		JUMP: { frames: [2], speed: 0 },
		FALL: { frames: [3], speed: 0 }
	};

	/**
	 * @type {Phaser.GameObjects.Container}
	 *
	 * @memberof Player
	 */
	skin;

	/**
	 * @type {Phaser.Physics.Arcade.Body}
	 *
	 * @memberof Player
	 */
	body;

	currentAnim = Player.anims.IDLE;
	frame = 0;

	fallTime = 0;

	/**
	 * Creates an instance of Player.
	 * @param {object} config
	 * @param {Phaser.Scene} config.scene
	 * @param {number} config.x
	 * @param {number} config.y
	 * @param {boolean} config.local
	 * @param {object} config.texture
	 * @param {number} config.texture.body
	 * @param {number} config.texture.shirt
	 * @param {number} config.texture.hairStyle
	 * @param {number} config.texture.hairColor
	 * @memberof Player
	 */
	constructor(config) {
		const body = config.scene.add
			.sprite(0, 0, `skin.body.${config.texture.body}`)
			.setOrigin(0.5, 1);
		const hair = config.scene.add
			.sprite(
				0,
				0,
				`skin.hair.${config.texture.hairStyle}.${config.texture.hairColor}`
			)
			.setOrigin(0.5, 1);
		const pants = config.scene.add
			.sprite(0, 0, `skin.pants.${config.texture.pants}`)
			.setOrigin(0.5, 1);

		const shirt = config.scene.add
			.sprite(0, 0, `skin.shirt.${config.texture.shirt}`)
			.setOrigin(0.5, 1);

		const eyes = config.scene.add.sprite(0, 0, "skin.eyes").setOrigin(0.5, 1);

		const skin = config.scene.add.container(0, -25, [
			body,
			hair,
			eyes,
			pants,
			shirt
		]);

		super(config.scene, config.x, config.y, [skin]);

		this.setSize(120, 290).setScale(0.1, 0.1);

		config.scene.add.existing(this);
		config.scene.physics.world.enable(this);

		this.skin = skin;
		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D");
		this.local = config.local;
		this.body.setOffset(0, -170);
	}

	update() {
		if (this.local) {
			const inputFrame = Object.fromEntries(
				Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
			);
			this.body.setVelocityX((inputFrame.D - inputFrame.A) * 100);

			if (this.fallTime === 0 && inputFrame.W && this.body.onFloor()) {
				this.body.setVelocityY(-200);
			} else this.body.setVelocityY(Math.min(this.body.velocity.y, 150));
		}

		if (this.body.velocity.y > 0 || this.fallTime > 0) {
			if (Math.abs(this.body.velocity.x) > 0)
				this.setFrame(Player.anims.FALL, this.body.velocity.x < 0);
			else this.setFrame(Player.anims.FALL);
			if (this.body.onFloor()) {
				this.setFrame(Player.anims.IDLE, null, 1, 0.75);
				this.fallTime -= 1;
			} else {
				this.fallTime = 7;
			}
		} else if (this.body.velocity.y < 0) {
			if (Math.abs(this.body.velocity.x) > 0)
				this.setFrame(Player.anims.JUMP, this.body.velocity.x < 0);
			else this.setFrame(Player.anims.JUMP);
		} else if (Math.abs(this.body.velocity.x) > 0) {
			this.setFrame(Player.anims.WALK, this.body.velocity.x < 0);
		} else {
			this.setFrame(Player.anims.IDLE);
		}
	}

	setFrame(anim, flipX, scaleX, scaleY) {
		if (anim !== this.currentAnim) {
			this.currentAnim = anim;
			this.frame = 0;
		}

		this.frame += this.currentAnim.speed / 60;
		this.skin.each((s) => {
			s.setFrame(
				this.currentAnim.frames[
					Math.floor(this.frame) % this.currentAnim.frames.length
				]
			);
			s.setFlipX(flipX ?? s.flipX);
		});

		this.skin.setScale(scaleX ?? 1, scaleY ?? 1);
	}
}
