const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
const CharacterType = require('CharacterType')
const StateMachine = require('javascript-state-machine')
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
            visible: false,
        },
        type: {
            default: null,
            type: String,
            visible: false,
        },
        hp: {
            default: 1,
            type: cc.Float,
            visible: false,
        },
        hpProgress: {
            default: null,
            type: cc.ProgressBar,
        },
        sprite: {
            default: null,
            type: cc.Sprite,
        },
    },
    onLoad() {
        this._initStateMachine()
    
    },
    _initStateMachine() {
        this.fsm = new StateMachine({
            init: 'init',
            transitions: [
                { name: 'startMoving', from: 'init', to: 'move' },
                { name: 'die', from: ['init', 'move'], to: 'die' },
                { name: 'reset', from: '*', to: 'init' },
            ],
            methods: {
                onEnterInit: (cha) => {

                },
                onEnterMove: () => {
                    this.onMove()
                },
                onEnterDie: () => {
                    this.onDie()
                },
            }
        })
    },
    init(charType,id) {
        this.id = id
        this.type = charType.type
        this.hp = charType.hp
        this.sprite.spriteFrame = charType.spriteFrame
        this.updateHp(1)
    },
    randomId() {
        let time = new Date().getTime()
        return time
    },
    updateHp(progress){
        this.hpProgress.progress = progress
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
    startMoveState() {
        if (this.fsm.can('startMoving')) {
            this.fsm.startMoving()
        }
    },
    dieState() {
        if (this.fsm.can('die')) {
            this.fsm.die()
        }
    },



});
