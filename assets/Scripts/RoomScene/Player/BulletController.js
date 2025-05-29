

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },

     
    },

    onLoad(){
        this._shootTimer = 0;
        this._shootInterval = 0.5;
    },


    update(){
        this.createBullet()
    },

    update(dt) {
        this._shootTimer += dt;
        if (this._shootTimer >= this._shootInterval) {
            this._shootTimer = 0;
            this.createBullet();
        }
    },
    
    createBullet(){
        let bullet = cc.instantiate(this.bulletPrefab)
        let bulletComponent = bullet.getComponent('Bullet')
        this.node.addChild(bullet)
        bulletComponent.onMove()
    }


});
