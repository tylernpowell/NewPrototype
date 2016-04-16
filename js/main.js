Door = function (x, y, locked, game, player) {

    var lock = locked;

    this.game = game;
    this.player = player;
    this.alive = true;
    this.immovable = true;
    this.moves = false;

    this.door = game.add.sprite(x,y, 'UpDoor');
    game.physics.enable(this.door, Phaser.Physics.ARCADE); 
};

Door.prototype.update = function() {
    if(game.physics.arcade.collide(player, door) && numberofKeys  > 0)
    {
        openDoor();
    }
};

Key = function(x, y, game, player) {
    this.game = game;
    this.player = player;
    this.alive = true;
    this.immovable = true;
    this.moves = false;
    
    this.key = game.add.sprite(x,y, 'Key');
    game.physics.enable(this.key, Phaser.Physics.ARCADE);
    this.key.body.setSize(24,24,5,16);
};

Key.prototype.update = function() {
    if(game.physics.arcade.overlap(player,key))
    {
        pickUpKey();
    }
    
};

window.onload = function(){
    
var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    var player;
    var layer;
    var collideLayer;
    var map;
    var collisionMap;
    var keys;
    var noteKey;
    var speed = 100;
    var music;
    var lastNote;
    var lastNoteText;
    var showNote;
    var envelope;
    var key;
    var envelopeIndex = 0;
    var keysIndex = 0;
    var numberOfKeys = 0;
    var keysText;
    var door;
    var doorIndex = 0;

    function preload() 
    {
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
        game.load.tilemap('level1', 'assets/level_prototype.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1Col', 'assets/level_collision.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('character', 'assets/Character.png', 32, 34);
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
        
        noteKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        lastNote = game.add.bitmapText(0, 0, 'carrier_command', '', 8);
        keysText = game.add.bitmapText(0, 0, 'carrier_command', 'x' + numberOfKeys, 8);
        lastNoteText = 'arrow keys - move\n\nspace to toggle note\n\ngame may contain performance issues';
        showNote = true;
        
        initEnvelopes();
        initKeys();
        initDoors();
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
        
        
        game.physics.arcade.overlap(envelope, player, pickUpEnvelope);
        game.physics.arcade.collide(player, collideLayer);
        
        if(game.physics.arcade.collide(player, door) && numberOfKeys > 0)
            {
                openDoor();
            }
        if(game.physics.arcade.overlap(player, key))
           {
                pickUpKey();
           }
        
        noteKey.onDown.add(toggleNote, this);
    }
    
    function toggleNote()
    {
        showNote = !showNote;
    }
    
    function initEnvelopes()
    {
        envelope = game.add.sprite(128, 256, 'Envelope')
        game.physics.enable(envelope, Phaser.Physics.ARCADE);

    }
    
    function initKeys()
    {
        key = game.add.sprite(128, 312, 'Key');
        game.physics.enable(key, Phaser.Physics.ARCADE);
        key.body.setSize(24, 24, 5, 16);
    }
    
    function initDoors()
    {
        door = game.add.sprite(450, 285, 'Door');
        game.physics.enable(door, Phaser.Physics.ARCADE);
        door.body.immovable = true;
        door.body.moves = false;
    }
    
    function pickUpEnvelope()
    {
        envelopeIndex++;
        switch(envelopeIndex)
            {
                case 1:
                    lastNoteText = 'Use key on the door';
                    envelope.x = 995;
                    envelope.y = 440;
                    break;
                case 2:
                    lastNoteText = 'Something wicked approaches...';
                    envelope.x = 1345;
                    envelope.y = 550;
                    break;
                case 3:
                    lastNoteText = 'The air feels uneasy...';
                    envelope.x = 2800;
                    envelope.y = 580;
                    break;
                case 4:
                    lastNoteText = 'do not let him find you';
                    envelope.kill();
                    break;
                default:
                    break;
            }
    }
    
    function pickUpKey()
    {
        numberOfKeys++;
        keysIndex++;
        
        switch(keysIndex)
            {
                case 1:
                    key.x = 2150;
                    key.y = 420;
                    break;
                case 2:
                    key.x = 3860;
                    key.y = 40;
                    break;
                case 3:
                    key.kill();
                    break;
                default:
                    break;
            }
    }
    
    function openDoor()
    {
        numberOfKeys--;
        doorIndex++;
        
        switch(doorIndex)
            {
                case 1:
                    door.x = 4665;
                    door.y = 450;
                    break;
                case 2:
                    door.kill();
                    break;
                default:
                    break;
            }
    }
    
    function render()
    {
        if(showNote)
            {
                lastNote.text = lastNoteText;
                keysText.text = 'x' + numberOfKeys;
                lastNote.text.anchor(0.5, 0.5);
                lastNote.x = player.x - (lastNote.textWidth * 0.5); //Centers text
                lastNote.y = player.y - 25;
                keysText.x = player.x + 30;
                keysText.y = player.y;
            }
        else
            {
                lastNote.text = '';
                keysText.text = '';
            }
        
        //game.debug.text('' + player.x + ', ' + player.y , 100, 100);
    }
};
