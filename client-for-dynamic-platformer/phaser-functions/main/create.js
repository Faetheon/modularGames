function create() {
  this.isPlayerDead = false;

  const map = this.make.tilemap({key: "map"});
  const tiles = map.addTilesetImage("0x72-industrial-tileset-32px-extruded", "tiles");

  map.createDynamicLayer("Background", tiles);
  this.groundLayer = map.createDynamicLayer("Ground", tiles);
  map.createDynamicLayer("Foreground", "tiles");

  // Instantiate a player instance at the location of the "Spawn Point" object in the Tiled map.
  // Note: instead of storing the player in a global variable, it's stored as a property of the scene.
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  this.player = new Player(this, spawnPoint.x, spawnPoint.y);

  shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  // Collide the player against the ground layer
  this.groundLayer.setCollisionByProperty({collides: true});
  this.physics.world.addCollider(this.player.sprite, this.groundLayer);

  // The map contains a row of spikes. tThe spike only take a small sliver of the tile graphic, so
  // if we let arcade physics treat the spikes as colliding the player will collide while the
  // sprite is hovering over the spikes. We''ll remove the spike tiles and turn them into sprites
  // so that we give them a more fitting hitbox.
  this.spikeGroup = this.physics.add.staticGroup();
  this.groundLayer.forEachTile(tile => {
    if (tile.index === 77) {
      const spike = this.spikeGroup.create(tile.getCenterX(), tile.getCenterY(), "spike");

      // The map has spikes rotated in Tiled (z key), so parse out that angle to the correct body
      // placement.
      spike.rotation = tile.rotation;
      if (spike.angle === 0) {
        spike.body.setSize(32, 6).setOffset(0, 26);
      } else if (spike.angle === -90) {
        spike.body.setSize(6, 32).setOffset(26, 0);
      } else if (spike.angle === 90) {
        spike.body.setSize(6, 32).setOffset(0, 0);
      }

      this.groundLayer.removeTileAt(tile.x, tile.y);
    }
  });
  
  this.cameras.main.startFollow(this.player.sprite);
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.marker = new MouseTileMarker(this, map);
  
  // // Set up the arrows to control the camera
  // const cursors = this.input.keyboard.createCursorKeys();
  // const controlConfig = {
  //   camera: this.cameras.main,
  //   left: cursors.left,
  //   right: cursors.right,
  //   up: cursors.up,
  //   down: cursors.down,
  //   speed: 0.5
  // };
  // controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

  // // Limit the camera to the map size
  // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // // Create a simple graphic that can be used to show which tile the mouse is over
  // marker = this.add.graphics();
  // marker.lineStyle(5, 0xffffff, 1);
  // marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
  // marker.lineStyle(3, 0xff4f78, 1);
  // marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
  
  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "Arrow keys/WASD to move and jump\nLeft-click to draw tiles\nShift + left-click to erase", {
      font: "18px monospace",
      fill: "#000000",
      padding: {x: 20, y: 10},
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0);
}