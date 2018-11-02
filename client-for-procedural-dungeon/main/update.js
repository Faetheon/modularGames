function update(time, delta) {
  this.player.update();
  if (this.hasPlayerReachedStairs) {
    return;
  }

  this.player.update();

  // Find the player's room using another helper method from the dungeon that converts from
  // dungeon XY (in grid units) to the corresponding room object
  const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
  const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
  const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

  this.tilemapVisibility.setActiveRoom(playerRoom);
}