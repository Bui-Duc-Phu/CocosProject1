const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')


cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
        bulletParent: {
            default: null,
            type: cc.Node,
        }
        
    },

    onLoad(){
        this._registerEvent()
    },

    _createBullet(worldPos) {
        console.log('createBullet', worldPos)
        const bullet = cc.instantiate(this.bulletPrefab);
        const bulletComponent = bullet.getComponent('Bullet');
        const localPos = this.bulletParent.convertToNodeSpaceAR(worldPos);
        bullet.setPosition(localPos);
        this.bulletParent.addChild(bullet);
        bulletComponent.onMove();
    },
    _registerEvent(){
        mEmitter.instance.registerEvent(EventDriver.PLAYER.ON_SHOOT, this._createBullet.bind(this))
    },
   


});
