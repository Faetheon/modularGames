function create() {

  // tuxmon setup
  const map = this.make.tilemap({key: "map"});
  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
  
  aboveLayer.setDepth(10);
  
  // Setting collision for certain tiles from our tile sheet
  worldLayer.setCollisionBetween(12, 44);
  
  // This tile map should have a spawn point
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  
  // Player setup
  // Setting the player sprite
  player = this.physics.add
  .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
  .setSize(30, 40)
  .setOffset(0, 24);
  
  // Setting player collisions
  this.physics.add.collider(player, worldLayer);
  
  // Create the player's waliking animations from the texture atlas.
  // These are stored in the global animation manager so any sprite can access them.
  const anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", {prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3}),
    framRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", {prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3}),
    framRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", {prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3}),
    framRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", {prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3}),
    framRate: 10,
    repeat: -1
  });
  
  // Setting up camera
  // Phaser supports multiple cameras, but you can access the default camer like this:
  const camera = this.cameras.main;
  camera.startFollow(player);
  
  // Constrain the camera so that it isn't allowed to move outside the width height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
  // Setting up arrow keys to control camera/player
  cursors = this.input.keyboard.createCursorKeys();
  // controls = new Phaser.Cameras.Controls.FixedKeyControl({
  //   camera: camera,
  //   left: cursors.left,
  //   right: cursors.right,
  //   up: cursors.up,
  //   down: cursors.down,
  //   speed: 0.5
  // });

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: {x: 20, y: 10},
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);
    
    // For loading basic mario square
    // // Load a map from a 2D array of tile indices
    // const level = [
  //   [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //   [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
  //   [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
  //   [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //   [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
  //   [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //   [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
  //   [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
  //   [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
  //   [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
  //   [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
  // ];
  
  // // When loading from an array, make sure to specify the tileWidth and tileHeight
  // const map = this.make.tilemap({data: level, tileWidth: 16, tileHeight: 16});
  // const tiles = map.addTilesetImage("mario-tiles");
  // const layer = map.createStaticLayer(0, tiles, 0, 0);
}