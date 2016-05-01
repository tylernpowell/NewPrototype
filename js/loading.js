var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
    
          // Loading bar is a good idea, so players aren't left wondering...
          //var loadingBar = this.add.sprite(160,240,"loading");
          //loadingBar.anchor.setTo(0.5,0.5);
          //this.load.setPreloadSprite(loadingBar);

		game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    game.load.image('BrickFloor', 'assets/BrickFloor.png');
    game.load.image('BrickWall', 'assets/BrickWall.png');
    game.load.image('BrickWall2', 'assets/BrickWall2.png');
    game.load.image('Envelope', 'assets/Envelope.png');
    game.load.image('CollapsedCieling', 'assets/CollapsedCeiling.png');
    game.load.image('CollapsedCieling2', 'assets/CollapsedCeiling2.png');
    game.load.image('CollapsedCieling3', 'assets/CollapsedCeiling3.png');
    game.load.image('CollapsedCieling4', 'assets/CollapsedCeiling4.png');
    game.load.image('ExitWindow', 'assets/ExitWindow.png');
    
    game.load.image('Key', 'assets/Key.png');
    game.load.image('Door', 'assets/door.png');
        
    game.load.tilemap('level1', 'assets/level_prototype.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level1Col', 'assets/level_collision.json', null, Phaser.Tilemap.TILED_JSON);
        
    game.load.spritesheet('character', 'assets/Character.png', 32, 34);
    game.load.spritesheet('ghost', 'assets/ghost.png', 32, 32);

    game.load.audio('music', 'assets/Darkness.mp3');
		
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
