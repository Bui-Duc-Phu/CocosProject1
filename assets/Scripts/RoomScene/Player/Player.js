

cc.Class({
    extends: cc.Component,

    properties: {
        spine: {
            default: null,
            type: sp.Skeleton
        },
        runSpeed: {
            default: 1.0,
        }

     
    },

    onLoad(){
        this.runAnim()
    },


    runAnim() {
        this.spine.timeScale = this.runSpeed;
        this.spine.setAnimation(0, 'aim', true);
        this.spine.setAnimation(1, 'shoot', true);
      
    },






     
});
