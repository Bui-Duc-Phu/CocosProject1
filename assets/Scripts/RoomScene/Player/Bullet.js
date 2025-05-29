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
        console.log('on collision enter');
        console.log(other.node.getComponent('CharItem').id)
        mEmitter.instance.emit(EventDriver.CHARACTER.ON_HIT, other.node.getComponent('CharItem').id)
    },
    onMove(){
        cc.tween(this.node)
        .by(1.5, {x: 3000})
        .call(() => {
            this.node.destroy();
        })
        .start();
    }
});
