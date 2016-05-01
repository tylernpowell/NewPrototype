Door = function(index, game, player, xPos, yPos)
{
    this.game = game;
    this.player = player;
    
    this.door = game.add.sprite(xPos, yPos, 'Door');
    this.door.index = index.toString();
    game.physics.enable(this.door, Phaser.Physics.ARCADE);
    this.door.body.immovable = true;
    this.door.body.moves = false;
}

Door.prototype.update = function()
{
    if(this.game.physics.arcade.collide(this.player.player, this.door))
            {
                this.player.openDoor(this.door);
            }
}