window.onload = function(){
    
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    var player;
    var collideLayer;
    var map;
    var music;
    var envelopes = [];
    var keys = [];
    var doors = [];
    var enemy;
    var heart;
    var knife;
    var pills;
    var cauldron;

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
        game.load.image('Door2', 'assets/door2.png');
        game.load.image('heart', 'assets/PixelHeart.png');
        game.load.image('knife', 'assets/PixelKnife.png');
        game.load.image('pills', 'assets/PixelPills.png');
        game.load.image('cauldron', 'assets/Cauldron.png');
        game.load.image('vision', 'assets/Vision.png');
        game.load.audio('music', 'assets/Darkness.mp3');
    }
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 0;  
        
        game.stage.backgroundColor = '#000000'; 
        
        map = game.add.tilemap('level1');
        map.addTilesetImage('Mansion-tiles'); 
        var layer = map.createLayer('Floor');
        layer.resizeWorld();
        collideLayer = map.createLayer('Wall');
        collideLayer.resizeWorld();
        map.setCollision([3, 5, 6, 11, 12], true, collideLayer);
        
        
        music = game.add.audio('music', 0.05, true);
        music.play();
        
        player = new Player(game, collideLayer, 165, 1500);
        
        //enemy = new Enemy(game, player, 128, 326);
        
        initObjects();
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

        //enemy.update();
        
        if(game.physics.arcade.collide(player.player, heart))
            {
                player.pickupHeart(heart);
            }
        if(game.physics.arcade.collide(player.player, knife))
            {
                player.pickupKnife(knife);
            }
        if(game.physics.arcade.collide(player.player, pills))
            {
                player.pickupPills(pills);
            }
        if(game.physics.arcade.collide(player.player, cauldron))
            {
                player.useCauldron();
            }
        
    }
    

    function render()
    {
        player.render();
        
        if(player != null)
            {
                game.debug.text('' + player.player.x + ', ' + player.player.y, 100, 100);
            }
    }
    
    function initObjects()
    {
        heart = game.add.sprite(736, 1220, 'heart');
        pills = game.add.sprite(736, 1600, 'pills');
        knife = game.add.sprite(1100, 1408, 'knife');
        cauldron = game.add.sprite(950, 1900, 'cauldron');
        
        game.physics.enable(heart, Phaser.Physics.ARCADE);
        game.physics.enable(pills, Phaser.Physics.ARCADE);
        game.physics.enable(knife, Phaser.Physics.ARCADE);
        game.physics.enable(cauldron, Phaser.Physics.ARCADE);
        
        cauldron.body.immovable = true;
        cauldron.body.moves = false;
        
        keys.push(new Key(0, game, player, 1453, 2055));
        keys.push(new Key(1, game, player, 1675, 613));
        keys.push(new Key(1, game, player, 2020, 1422));
        doors.push(new Door2(1, game, player, 736, 1340));
        doors.push(new Door2(2, game, player, 736, 1500));
        doors.push(new Door(3, game, player, 996, 1408));
        envelopes.push(new Note('hello world!!!', game, player, 128, 64));
        envelopes.push(new Note('this is a note', game, player, 128, 312));
        envelopes.push(new Note('this is also a note', game, player, 256, 275));
        envelopes.push(new Note('next note', game, player, 256, 280));
    }
};
