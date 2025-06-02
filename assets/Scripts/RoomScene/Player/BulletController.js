const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')


cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },
    onLoad(){
        this._registerEvent()
        this._initValue()
    },
    _initValue(){
        this.ListBullet = []
    },
    _createBullet(worldPos) {
        const bullet = cc.instantiate(this.bulletPrefab);
        const bulletComponent = bullet.getComponent('Bullet');
        const localPos = this.node.convertToNodeSpaceAR(worldPos);
        bullet.setPosition(localPos);
        this.node.addChild(bullet);
        bulletComponent.onMove();
        console.log('ListBullet', this.ListBullet)
    },
    _registerEvent(){
       mEmitter.instance.registerEvent(EventDriver.PLAYER.ON_SHOOT, this._createBullet.bind(this))
    },
    _removeEvent(){
        mEmitter.instance.removeEvent(EventDriver.PLAYER.ON_SHOOT, this._createBullet.bind(this))
    },
    onDestroy(){
        this._removeEvent()
    },
});
