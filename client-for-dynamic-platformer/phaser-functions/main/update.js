function update(time, delta) {
  if (this.isPlayerDead) {
    return;
  }
  this.marker.update();
  this.player.update();
  
  // // Convert the mouse position to world position within the camera
  const pointer = this.input.activePointer;
  const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
  if (pointer.isDown) {
    const tile = this.groundLayer.putTileAtWorldXY(6, worldPoint.x, worldPoint.y);
    tile.setCollision(true);
  }

  // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
  // then tile -> world, we end up with the position of the tile under the pointer
  // const pointerTileXY = groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
  // const snappedWorldPoint = groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
  // marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
  
  // // Draw tiles (only within the groundLayer)
  // if (this.input.manager.activePointer.isDown) {
  //   if (shiftKey.isDown) {
  //     groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
  //   } else {
  //     groundLayer.putTileAtWorldXY(353, worldPoint.x, worldPoint.y);
  //   }
  // }

  if (
    this.player.sprite.y > this.groundLayer.height ||
    this.physics.world.overlap(this.player.sprite, this.spikeGroup)
    ) {
      // Flag that the player is dead so that we can stop update from running in the future
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
      cam.fade(250, 0, 0, 0);

      // Freeze the player to leave them on screen while fading but remove the marker immediately
      this.player.freeze();
      this.marker.destroy();

      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      })
  }
}