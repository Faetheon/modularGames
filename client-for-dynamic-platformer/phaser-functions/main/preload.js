const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#1d212d",
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 1000}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let controls;
let marker;
let player;
let shiftKey;
let groundLayer;

function preload() {
  this.load.spritesheet(
    "player",
    "assets/spritesheets/0x72-industrial-player-32px-extruded.png",
    {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2
    }
  );
  this.load.image("spike", "assets/images/0x72-industrial-spike.png");
  this.load.image("tiles", "assets/tilesets/0x72-industrial-tileset-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "assets/tilemaps/platformer.json");
}