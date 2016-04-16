Key = function(index, game, player, xPos, yPos)
{
    this.game = game;
    this.player = player;
    
    this.key = game.add.sprite(xPos, yPos, 'Key');
    this.key.index = index.toString();
    game.physics.enable(this.key, Phaser.Physics.ARCADE);
    this.key.body.immovable = true;
    this.key.body.moves = false;
}

Key.prototype.update = function()
{
    if(this.game.physics.arcade.overlap(this.player.player, this.key))
           {
                this.player.pickupKey(this.key);
           }
}