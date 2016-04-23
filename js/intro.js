var intro = function(game){}

intro.prototype = {
  create: function(){
    var intro = this.game.add.sprite(200,150,"introSpr");
    intro.anchor.setTo(0.5,0.5);
    var startButton = this.game.button(200,300,"startSpr",this.startGame,this);
    startButton.anchor.setTo(0.5,0.5);
  },
  
  startGame: function(){
    this.game.state.start("Floor1");
  }
}
