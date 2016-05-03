var floor2 = function(game){}

floor2.prototype = {
  var player;
  var layer;
  var collideLayer;
  var map;
  var collisionMap;
  var music;
  var envelopes = [];
  var keys = [];
  var doors = [];
  var enemy;
    
  init: function(notes,numKeys){
    numOfKeys = numKeys;
    envolopes = notes;
  },
  create: function(){
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 0;  
        
        game.stage.backgroundColor = '#000000'; 
  }
}
