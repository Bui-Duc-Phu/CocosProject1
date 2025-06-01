
const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 2000,
        positionDefault: cc.v2(0, 0),
        player: {
            default: null,
            type: cc.Prefab,
        },
        posisonSpawnBullet: {
            default: null,
            type: cc.Node,
        },

        currentPlayer: require('Player')


    },


    onLoad() {
        this.spawnPlayer()
    },

    start() {
        // Enable keyboard input
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // Initialize key states
        this.keys = {
            w: false,
            s: false,
            a: false,
            d: false,
            j: false
        };
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                this.keys.w = true;
                break;
            case cc.macro.KEY.s:
                this.keys.s = true;
                break;
            case cc.macro.KEY.a:
                this.keys.a = true;
                break;
            case cc.macro.KEY.d:
                this.keys.d = true;
                break;
            case cc.macro.KEY.j:
                this.currentPlayer.shootAnim() 
                this.spawnBullet(); 
                break;
        }
    },
    

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                this.keys.w = false;
                break;
            case cc.macro.KEY.s:
                this.keys.s = false;
                break;
            case cc.macro.KEY.a:
                this.keys.a = false;
                break;
            case cc.macro.KEY.d:
                this.keys.d = false;
                break;
            case cc.macro.KEY.j:
                this.keys.j = false;
                break;
        }
    },

    update(dt) {
        // Handle movement in update
        if (this.keys.w) {
            this.node.y += this.moveSpeed * dt;
        }
        if (this.keys.s) {
            this.node.y -= this.moveSpeed * dt;
        }
        if (this.keys.a) {
            this.node.x -= this.moveSpeed * dt;
        }
        if (this.keys.d) {
            this.node.x += this.moveSpeed * dt;
        }
        if (this.keys.j) {
            this.spawnBullet()
        }
    },
    spawnPlayer() {
        this.positionDefault = cc.v2(270, 350)
        const player = cc.instantiate(this.player)
        this.posisonSpawnBullet = player.children.find(child => child.name === "posisonSpawnBullet");
        const playerComponent = player.getComponent('Player')
        playerComponent.init(Date.now());
        this.node.addChild(player)
        const position = this.node.convertToNodeSpaceAR(this.positionDefault)
        player.setPosition(position)
        this.currentPlayer = playerComponent
        this.currentPlayer.defaultAnim();
    },
    spawnBullet() {
        let worldPos = this.posisonSpawnBullet.convertToWorldSpaceAR(cc.v2(0, 0));
        mEmitter.instance.emit(EventDriver.PLAYER.ON_SHOOT, worldPos);
    }
});
