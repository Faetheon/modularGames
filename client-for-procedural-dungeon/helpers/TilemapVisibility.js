class TilemapVisibility {
  constructor(shadowLayer) {
    this.shadowLayer = shadowLayer;
    this.activeRoom = null;
  }

  setActiveRoom(room) {
    // We only need to update the tiles if the active room has changes
    if (room !== this.activeRoom) {
      this.setRoomAlpha(room, 0); // Make the room visible
      if (this.activeRoom) {
        this.setRoomAlpha(this.activeRoom, 0.5);
      }
      this.activeRoom = room;
    }
  }

  setRoomAlpha(room, alpha) {
    this.shadowLayer.forEachTile(
      t => (t.alpha = alpha),
      this,
      room.x,
      room.y,
      room.width,
      room.height
    );
  }
}