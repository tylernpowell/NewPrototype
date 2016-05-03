Enemy = function (game, player, xPos, yPos) 
{
    
    this.enemySpeed = 75;
    this.movementTime = 200;
    this.movementDelay = 500;
    this.delayTimer = 0;
    this.game = game;
    this.movementTimer = this.game.time.elapsed + this.movementTime;
    this.player = player;

    this.enemy = game.add.sprite(xPos, yPos, 'ghost');
    game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.setSize(24, 24, 5, 16);
}

Enemy.prototype.update = function () 
{
    if (this.game.physics.arcade.overlap(this.player.player, this.enemy))
    {
        this.player.kill();
    }
    
    this.enemy.body.velocity.y = 0;
    this.enemy.body.velocity.x = 0;

    var errorMargin = 8;
    var randomValue = this.game.rnd.integerInRange(0, 100);
    
    if(randomValue <= 33)
        {
            if (this.enemy.y < this.player.player.y - errorMargin) 
    {
        this.enemy.body.velocity.y = this.enemySpeed;
    }
    else if (this.enemy.y > this.player.player.y + errorMargin) 
    {
        this.enemy.body.velocity.y = -this.enemySpeed;
    }
    else if(this.enemy.x < this.player.player.x - 4)
    {
        this.enemy.body.velocity.x = this.enemySpeed;
    }
    else if(this.enemy.x > this.player.player.x + 4)
    {
        this.enemy.body.velocity.x = -this.enemySpeed;
    }
        }
    else
        {
            if(this.enemy.x < this.player.player.x - 4)
                {
                    this.enemy.body.velocity.x = this.enemySpeed;
                }
            else if(this.enemy.x > this.player.player.x + 4)
                {
                    this.enemy.body.velocity.x = -this.enemySpeed;
                }
            else if(this.enemy.y < this.player.player.y - errorMargin)
                {
                    this.enemy.body.velocity.y = this.enemySpeed;
                }
            else if(this.enemy.y > this.player.player.y + errorMargin)
                {
                    this.enemy.body.velocity.y = -this.enemySpeed;
                }
        }
}