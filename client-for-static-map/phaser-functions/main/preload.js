const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
  // for loading basic mario tiles this.load.image("mario-tiles", "assets/tilesets/super-mario-tiles.png");

  // tuxmon setup
  this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "assets/tilemaps/tuxemon-town.json");
  this.load.atlas("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
}