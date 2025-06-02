const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true
    },
    onCollisionEnter: function (other, self) {
        this.node.destroy();
        mEmitter.instance.emit(EventDriver.CHARACTER.ON_HIT, other.node.getComponent('CharItem').id,self.node.getPosition())
    },
    onMove(){
        this.tween = cc.tween(this.node)
       this.tween.by(1.5, {x: 3000})
        .call(() => {
            this.node.destroy();
        })
        .start();
    },
    onDestroy(){
        this.tween.stop()
    }
});
