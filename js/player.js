///TODO Hold down a button to display all text on the screen

Player = function(game, collideLayer, xPos, yPos)
{
    this.playerSpeed = 100;                                                                                     //Player speed
    this.notesList = [];                                                                                         //Keeps a list of all notes player has collected
    this.numberOfKeys = 0;                                                                                      //Number of keys the player owns
    this.displayNote = true;                                                                                    //Display note on screen
    this.currentNote = 'arrow keys - move\n\nspace to toggle note\n\ngame may contain performance issues';     //Starting text to display
    
    this.noteText = game.add.bitmapText(0, 0, 'carrier_command', '', 8);
    this.keysText = game.add.bitmapText(0, 0, 'carrier_command', 'x' + this.numberOfKeys, 8);
    
    this.game = game;
    this.colliderLayer = collideLayer
    this.player = game.add.sprite(xPos, yPos, 'character');
    
    this.player.animations.add('down', [0, 1, 2], 10, false);
    this.player.animations.add('left', [3, 4, 5], 10, false);
    this.player.animations.add('right', [6, 7, 8], 10, false);
    this.player.animations.add('up', [9, 10, 11], 10, false);
    
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    
    this.player.body.setSize(24, 24, 5, 16);
    this.player.body.collideWorldBounds = true;  
    
    this.movementKeys = game.input.keyboard.createCursorKeys();
    this.displayNoteKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.camera.follow(this.player);
    this.displayNoteKey.onDown.add(this.toggleNote, this);
}

Player.prototype.update = function()
{
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    
    if(this.movementKeys.right.isDown)
            {
                this.player.body.velocity.x = this.playerSpeed;
                this.player.animations.play('right');
            }
    else if(this.movementKeys.left.isDown)
            {
                this.player.body.velocity.x = -this.playerSpeed;
                this.player.animations.play('left');
            }
    else if(this.movementKeys.up.isDown)
            {
                this.player.body.velocity.y = -this.playerSpeed;
                this.player.animations.play('up');
            }
    else if(this.movementKeys.down.isDown)
            {
                this.player.body.velocity.y = this.playerSpeed;
                this.player.animations.play('down');
            }
    
    this.game.physics.arcade.collide(this.player, this.colliderLayer);
}

Player.prototype.render = function()
{
    if(this.displayNote)
            {
                this.noteText.text = this.currentNote;
                this.keysText.text = 'x' + this.numberOfKeys;
                this.noteText.text.anchor(0.5, 0.5);
                this.noteText.x = this.player.x - (this.noteText.textWidth * 0.5); //Centers text
                this.noteText.y = this.player.y - 25;
                this.keysText.x = this.player.x + 30;
                this.keysText.y = this.player.y;
            }
        else
            {
                this.noteText.text = '';
                this.keysText.text = '';
            }
}

Player.prototype.toggleNote = function()
{
    this.displayNote = !this.displayNote;
}

Player.prototype.pickupKey = function(key)
{
    ++this.numberOfKeys;
    key.kill();
}