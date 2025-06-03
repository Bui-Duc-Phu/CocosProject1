const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
const BulletType = require('BulletType')
cc.Class({
    extends: cc.Component,

    properties: {
        id:{
            default: 0,
            type: cc.String,
        },
        type:{
            default: BulletType.NORMAL.type,
            type: cc.String,
        },
    },
    onLoad() {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true
    },
    onCollisionEnter: function (other, self) {
        mEmitter.instance.emit(EventDriver.CHARACTER.ON_HIT, other.node.getComponent('CharItem').id, self.node.getPosition(),self.node.getComponent('Bullet'))
    },
    onMove() {
        this.tween = cc.tween(this.node)
        this.tween.by(1.5, { x: 3000 })
            .call(() => {
                this._bulletClear()
            })
            .start();
    },
    onDestroy() {
        this.tween.stop()
    },
    init(id,type) {
        this.id = id
        this.type = type
    },
    _bulletClear(){
       mEmitter.instance.emit(EventDriver.BULLET.ON_CLEAR, this.id)
    },
    clear(){
        this.node.destroy()
    }
});
