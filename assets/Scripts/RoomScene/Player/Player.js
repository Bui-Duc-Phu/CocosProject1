

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
        this.spine.setAnimation(1, 'shoot', false);
    },
    defaultAnim(){
        this.spine.setAnimation(0, 'idle', true);
    },
    init(id){
        this.id = id
    },


     
});
