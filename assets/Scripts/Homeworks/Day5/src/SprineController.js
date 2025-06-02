const SprineEvent = require('SprineEvent');

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
        SprineEvent.instance.registerEvent("RUN_ANIM", this.runAnim.bind(this));
    },
    runAnim(animName) {
        this.spine.timeScale = this.runSpeed;
        this.spine.setAnimation(0, animName, true);
  
    },
    getAllAnimNames(){
            const animList = this.spine.skeletonData._skeletonJson.animations
            const animationNames = Object.keys(animList);
            return animationNames;
    }
});
