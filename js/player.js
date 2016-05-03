Player = function(game, collideLayer, xPos, yPos)
{
    this.playerSpeed = 100;                                                                                     //Player speed
    this.notesList = [];                                                                                         //Keeps a list of all notes player has collected
    this.numberOfKeys = 0;                                                                                      //Number of keys the player owns
    this.displayNote = true;                                                                                    //Display note on screen
    this.displayAll = false;                                                                                    //Display all notes on screen
    this.isAlive = true;
    this.currentNote = 'arrow keys - move\n\nT to toggle note\n\nhold space to show all notes';                  //Starting text to display
    this.heart = false;
    this.pills = false;
    this.knife = false;
    this.atticKey = false;
    
    this.noteText = game.add.bitmapText(0, 0, 'carrier_command', '', 8);
    this.keysText = game.add.bitmapText(0, 0, 'carrier_command', 'x' + this.numberOfKeys, 8);
    this.allText = game.add.bitmapText(128, 128, 'carrier_command', '', 8);
    this.allText.fixedToCamera = true;
    
    this.game = game;
    this.colliderLayer = collideLayer;
    this.player = game.add.sprite(xPos, yPos, 'character');
    
    this.player.animations.add('down', [0, 1, 2], 10, false);
    this.player.animations.add('left', [3, 4, 5], 10, false);
    this.player.animations.add('right', [6, 7, 8], 10, false);
    this.player.animations.add('up', [9, 10, 11], 10, false);
    
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    
    this.player.body.setSize(24, 24, 5, 16);
    this.player.body.collideWorldBounds = true;  
    
    this.movementKeys = game.input.keyboard.createCursorKeys();
    this.displayNoteKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.displayAllKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.camera.follow(this.player);
    this.displayNoteKey.onDown.add(this.toggleNote, this);
    
    
}

Player.prototype.update = function()
{
    if(!this.isAlive)
    {
        return;
    }

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
    
    if(this.displayAllKey.isDown)
        {
            this.displayAll = true;
        }
    else
        {
            this.displayAll = false;
        }
    
    
    this.game.physics.arcade.collide(this.player, this.colliderLayer);
}

Player.prototype.render = function()
{
    if (!this.isAlive)
    {
        this.allText.text = 'YOU DIED';
        this.noteText.text = '';
        this.keysText.text = '';
        return;
    }
    if(this.displayNote)
            {
                this.noteText.text = this.currentNote;
                this.keysText.text = 'x' + this.numberOfKeys;
                this.noteText.text.anchor(0.5, 0.5);
                this.noteText.x = this.player.x - (this.noteText.textWidth * 0.5); //Centers text
                this.noteText.y = this.player.y - (this.noteText.textHeight + 20);
                this.keysText.x = this.player.x + 30;
                this.keysText.y = this.player.y;
            }
        else
            {
                this.noteText.text = '';
                this.keysText.text = '';
            }
    
    if(this.displayAll)
        {
            this.allText.text = this.displayAllNotes();
            this.noteText.text = '';
            this.keysText.text = '';
        }
    else
        {
            this.allText.text = '';
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

Player.prototype.openDoor = function(door)
{
    if(this.numberOfKeys > 0)
        {
            --this.numberOfKeys;
            door.kill();
        }
    
}

Player.prototype.pickupNote = function(note)
{
    this.notesList.push(note.text);
    this.currentNote = note.text;
    this.displayNote = true;
    note.kill();
}

Player.prototype.displayAllNotes = function()
{
    if(this.notesList.length == 0)
        {
            return 'none';
        }
    var str = '';
    for(var i = 0; i < this.notesList.length; ++i)
        {
            var num = i + 1;
            str += num + '. ' + this.notesList[i] + '\n\n';
            
        }
    
    return str;
}

Player.prototype.kill = function()
{
    this.player.kill();
    this.isAlive = false;
    this.displayNote = false;
    this.displayAll = false;
    
    
}

Player.prototype.useCauldron = function()
{
    this.currentNote = 'it\'s a cauldron.';
    this.displayNote = true;
    if(this.heart && this.knife && this.pills)
        {
            this.atticKey = true;
            this.notesList.push('Attic key found.');
            this.currentNote = 'Attic key found.';
        }
    
    
}

Player.prototype.pickupHeart = function(heart)
{
    this.heart = true;
    var n = 'Heart found.';
    
    this.notesList.push(n);
    this.currentNote = n;
    this.displayNote = true;
    
    heart.kill();
}

Player.prototype.pickupKnife = function(knife)
{
    this.knife = true;
    
    var n = 'Knife found.';
    
    this.notesList.push(n);
    this.currentNote = n;
    this.displayNote = true;
    
    knife.kill();
}

Player.prototype.pickupPills = function(pills)
{
    this.pills = true;
    
    var n = 'Pills found.';
    
    this.notesList.push(n);
    this.currentNote = n;
    this.displayNote = true;
    
    pills.kill();
}

