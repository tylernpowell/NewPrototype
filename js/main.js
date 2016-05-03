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
        game.load.tilemap('level1', 'assets/Mansion.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Mansion-tiles', 'assets/Mansion-tiles.png');
        game.load.spritesheet('character', 'assets/Character.png', 32, 34);
        game.load.spritesheet('ghost', 'assets/ghost.png', 32, 42);
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
        map.addTilesetImage('Mansion-tiles'); 
        collideLayer = map.createLayer('Wall');
        collideLayer.resizeWorld();
        layer = map.createLayer('Floor');
        layer.resizeWorld();
        
        map.setCollision([3, 11, 12], true, collideLayer);
        
        
        music = game.add.audio('music', 0.05, true);
        music.play();
        
        player = new Player(game, collideLayer, 165, 1500);
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
        
        if(player != null)
            {
                game.debug.text('' + player.player.x + ', ' + player.player.y, 100, 100);
            }
    }
};
