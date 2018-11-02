function preload() {
  this.load.image("tiles", "assets/tilesets/buch-tileset-48px-extruded.png");
  this.load.spritesheet(
    "characters",
    "assets/spritesheets/buch-characters-64px-extruded.png",
    {
      frameWidth: 64,
      frameHeight: 64,
      margin: 1,
      spacing: 2
    }
  );
}