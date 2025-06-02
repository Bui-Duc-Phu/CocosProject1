

cc.Class({
    extends: cc.Component,

    properties: {
        spine: {
            default: null,
            type: sp.Skeleton
        },
        runSpeed: {
            default: 1.0,
        },
        id: {
            default: '',
            type: cc.String,
        }   
    },
    shootAnim() {
        this.spine.timeScale = this.runSpeed;
        this.spine.setAnimation(2, 'shoot', false);
    },
    defaultAnim(){
        this.spine.setAnimation(0, 'idle', true); 
    },

    runAnim(){
        this.spine.setAnimation(1, 'run', true);
    },
    stopAnim(){
        this.spine.setAnimation(1, 'idle', true);
    },
    init(id){
        this.id = id
    },


     
});
