var preload = function(game){}
 
preload.prototype = {
    preload: function(){ 
    
    // Loading screen, so players aren't left wondering...
    var loading = this.add.sprite(160,240,"loading");
    loading.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loading);

    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

    game.load.image('BrickFloor', 'assets/BrickFloor.png');
    game.load.image('BrickWall', 'assets/BrickWall.png');
    game.load.image('BrickWall2', 'assets/BrickWall2.png');
    game.load.image('CollapsedCieling', 'assets/CollapsedCeiling.png');
    game.load.image('CollapsedCieling2', 'assets/CollapsedCeiling2.png');
    game.load.image('CollapsedCieling3', 'assets/CollapsedCeiling3.png');
    game.load.image('CollapsedCieling4', 'assets/CollapsedCeiling4.png');
    game.load.image('Stairs_DU', 'assets/Stairs_DU.png');
    game.load.image('Stairs_LR', 'assets/Stairs_LR.png');
    game.load.image('Stairs_RL', 'assets/Stairs_RL.png');
    game.load.image('Stairs_UD', 'assets/Stairs_UD.png');
    game.load.image('ExitWindow', 'assets/ExitWindow.png');
    
    game.load.image('Envelope', 'assets/Envelope.png');
    game.load.image('Key', 'assets/Key.png');
    game.load.image('Door', 'assets/door.png');
    
    // Coins may be used in game or as simply placeholders for other items.
    game.load.image('Coin', 'assets/coin.png');
        
    game.load.spritesheet('character', 'assets/Character.png', 32, 34);
    game.load.spritesheet('ghost', 'assets/ghost.png', 32, 32);
        
    game.load.tilemap('floor1', 'assets/Floor1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('floor2', 'assets/Floor2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('basement', 'assets/Basement.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('attic', 'assets/Attic.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.audio('music', 'assets/Darkness.mp3');
		
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
