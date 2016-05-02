var init = function(game){};

init.prototype = {
  preload: function(){
    // Loading the image used for our loading screen.
    this.game.loadScreen.image("loading","assets/loading.png");
  },
  create: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scalepageAlignHorizontally = true;
    this.scale.setScreenSize();
    this.game.state.start("Preload");
  }
}
