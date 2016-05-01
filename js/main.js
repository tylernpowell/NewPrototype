window.onload = function(){
    
var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    var player;
    var layer;
    var collideLayer;
    var map;
    var collisionMap;
    var music;
    var envelopes = [];
    var keys = [];
    var doors = [];
    var enemy;

    function preload() 
    {
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
        game.load.tilemap('level1', 'assets/level_prototype.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1Col', 'assets/level_collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('character', 'assets/Character.png', 32, 34);
        game.load.spritesheet('ghost', 'assets/ghost.png', 32, 32);
        game.load.image('BrickFloor', 'assets/BrickFloor.png');
        game.load.image('BrickWall', 'assets/BrickWall.png');
        game.load.image('BrickWall2', 'assets/BrickWall2.png');
        game.load.image('Envelope', 'assets/Envelope.png');
        game.load.image('Key', 'assets/Key.png');
        game.load.image('Door', 'assets/door.png');
        game.load.audio('music', 'assets/Darkness.mp3');
    }
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 0;  
        
        game.stage.backgroundColor = '#000000'; 
        
        map = game.add.tilemap('level1');
        map.addTilesetImage('BrickFloor'); 
        map.addTilesetImage('BrickWall');
        
        collisionMap = game.add.tilemap('level1Col');
        collisionMap.addTilesetImage('BrickWall2');
        collisionMap.setCollisionByExclusion([ 51 ]);
        
        layer = map.createLayer('Tile Layer 1');
        
        collideLayer = collisionMap.createLayer('Tile Layer 2');
        collideLayer.resizeWorld();
        
        music = game.add.audio('music', 0.05, true);
        music.play();
        
        player = new Player(game, collideLayer, 165, 128);
        keys.push(new Key(0, game, player, 256, 256));
        doors.push(new Door(0, game, player, 128, 256));
        envelopes.push(new Note('hello world!!!', game, player, 128, 64));
        envelopes.push(new Note('this is a note', game, player, 128, 312));
        envelopes.push(new Note('this is also a note', game, player, 256, 275));
        envelopes.push(new Note('next note', game, player, 256, 280));
        enemy = new Enemy(game, player, 128, 326);
    }

    function update() 
    {   
        player.update();
        
        var i = 0;
        for(i = 0; i < keys.length; ++i)
            {
                keys[i].update();
            }
        for(i = 0; i < doors.length; ++i)
            {
                doors[i].update();
            }
        for(i = 0; i < envelopes.length; ++i)
            {
                envelopes[i].update();
        }

        enemy.update();
    }
    

    function render()
    {
        player.render();
    }
};
