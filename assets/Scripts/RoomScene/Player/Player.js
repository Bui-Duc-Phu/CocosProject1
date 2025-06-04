const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')

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
        this.spine.setAnimation(1, 'run', false);
    },
    portalAnim(){
        this.spine.setAnimation(0, 'portal', false);      
        this.spine.addAnimation(0, 'idle', true)
        this.spine.setCompleteListener(() => {
            mEmitter.instance.emit(EventDriver.GAME.ON_START)
        })         
    },
    deathAnim(){
        this.spine.setAnimation(4, 'death', false);
    },

    init(id){
        this.id = id;
    },


     
});
