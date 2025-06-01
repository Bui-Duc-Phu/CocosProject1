const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
const CharacterType = require('CharacterType')
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
        type: {
            default: CharacterType.DOG,
            type: CharacterType,
        },
    },
    onLoad() {
        this.id = this.randomId()
    },
    randomId() {
        let time = new Date().getTime()
        return time
    },
    onMove() {
        this.moveTween = cc.tween(this.node)
            .by(10, { x: -1560 })
            .call(() => {
                mEmitter.instance.emit(EventDriver.CHARACTER.ON_DIE, this.id)
            })
            .start();

        this.floatTween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .parallel(
                        cc.tween().sequence(
                            cc.tween().to(0.4, { scale: 0.9 }),
                            cc.tween().to(0.4, { scale: 1 })
                        ),
                        cc.tween().sequence(
                            cc.tween().by(0.7, { y: 10 }),
                            cc.tween().by(0.4, { y: -10 })
                        )
                    )
            )
            .start();
    },
    onDie() {
        if (this.moveTween) {
            this.moveTween.stop();
        }
        if (this.floatTween) {
            this.floatTween.stop();
        }
        const collider = this.node.getComponent(cc.Collider);
        if (collider) {
            collider.enabled = false;
        }
        this.dieTween = cc.tween(this.node)
            .to(0.8, { opacity: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start();

    },

    onClear() {
        this.node.destroy();
    },

    onDestroy() {
        if (this.moveTween) {
            this.moveTween.stop();
        }
        if (this.floatTween) {
            this.floatTween.stop();
        }
        if (this.dieTween) {
            this.dieTween.stop();
        }
        this.node.destroy();
    },
    _initValue(id){
        this.id = id
    },



});
