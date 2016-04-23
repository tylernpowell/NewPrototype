var init = function(game){};

init.prototype = {
  preload: function(){
    this.game.loadScreen.image("loadScr","assets/loadScr.png");
  },
  create: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scalepageAlignHorizontally = true;
    this.scale.setScreenSize();
    this.game.state.start("Preload");
  }
}
