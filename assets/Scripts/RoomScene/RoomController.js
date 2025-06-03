

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
        this.colisionManager()
    },
    colisionManager(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true
    },
  
});
