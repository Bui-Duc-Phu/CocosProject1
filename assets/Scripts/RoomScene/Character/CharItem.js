const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 150,
            type: cc.Float,
        },
        id: {
            default: 0,
            type: cc.String,
        },
    },
    onLoad(){
        this.id = this.randomId()
        this.registerEvent()
    },
    randomId(){
        let time = new Date().getTime()
        return time
    },
    registerEvent(){
        mEmitter.instance.registerEvent(EventDriver.CHARACTER.ON_HIT,this.onDie.bind(this))
    },
    onMove() {
        cc.tween(this.node)
            .by(10, { x: -1560 })
            .call(() => {
                this.node.destroy();
            })
            .start();
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.4, { scale: 0.9 })
                    .to(0.4, { scale: 1 })
            )
            .start();
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .by(0.7, { y : 10 })
                    .by(0.4, { y: -10 })
            )
            .start();
    },
    onDie(id){
        if(this.id == id){
            this.node.destroy();
        }
    }


});
