window.onload = function(){
    
var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
    var player;
    var layer;
    var collideLayer;
    var map;
    var collisionMap;
    var keys;
    var speed = 100;
    var music;

    function preload() 
    {
        game.load.tilemap('level1', 'assets/level_prototype.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1Col', 'assets/level_collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('character', 'assets/Character.png', 32, 34);
        game.load.image('BrickFloor', 'assets/BrickFloor.png');
        game.load.image('BrickWall', 'assets/BrickWall.png');
        game.load.image('BrickWall2', 'assets/BrickWall2.png');
        game.load.audio('music', 'assets/Darkness.mp3');
    }
    function create() 
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 0;  
        
        game.stage.backgroundColor = '#ffffff'; 
        
        map = game.add.tilemap('level1');
        map.addTilesetImage('BrickFloor'); 
        map.addTilesetImage('BrickWall');
        
        collisionMap = game.add.tilemap('level1Col');
        collisionMap.addTilesetImage('BrickWall2');
        collisionMap.setCollisionByExclusion([ 51 ]);
        
        layer = map.createLayer('Tile Layer 1');
        //layer.resizeWorld();
        
        collideLayer = collisionMap.createLayer('Tile Layer 2');
        collideLayer.resizeWorld();
        
        player = game.add.sprite(128, 128, 'character'); 
        player.animations.add('down', [0, 1, 2], 10, false);
        player.animations.add('left', [3, 4, 5], 10, false);
        player.animations.add('right', [6, 7, 8], 10, false);
        player.animations.add('up', [9, 10, 11], 10, false);
        
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.setSize(24, 24, 5, 16);
        player.body.collideWorldBounds = true;  
        game.camera.follow(player); 
        keys = game.input.keyboard.createCursorKeys(); 
        
        music = game.add.audio('music', 0.05, true);
        music.play();
    }

    function update() 
    {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
         
        if(keys.right.isDown)
            {
                player.body.velocity.x = speed;
                player.animations.play('right');
            }
        else if(keys.left.isDown)
            {
                player.body.velocity.x = -speed;
                player.animations.play('left');
            }
        else if(keys.up.isDown)
            {
                player.body.velocity.y = -speed;
                player.animations.play('up');
            }
        else if(keys.down.isDown)
            {
                player.body.velocity.y = speed;
                player.animations.play('down');
            }
        
        game.physics.arcade.collide(player, collideLayer); 
    }

    function render () 
    {
        
    }
};
