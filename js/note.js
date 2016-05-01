Note = function(noteText, game, player, xPos, yPos)
{
    this.game = game;
    this.player = player;
    
    this.note = game.add.sprite(xPos, yPos, 'Envelope');
    this.note.text = noteText;
    game.physics.enable(this.note, Phaser.Physics.ARCADE);
    this.note.body.immovable = true;
    this.note.body.moves = false;
}

Note.prototype.update = function()
{
    if(this.game.physics.arcade.overlap(this.player.player, this.note))
            {
                this.player.pickupNote(this.note);
            }
}