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
        },
        type: {
            default: null,
            type: CharacterType,
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
                onEnterInit: (id) => {
                    this._initValue(id)
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
    init(charTypeConfig) {
        this.type = charTypeConfig
        this.hpMax = charTypeConfig.hp
        this.updateHp(this.hpMax)
        
        if (charTypeConfig.sprite instanceof cc.SpriteFrame) {
            this.sprite.spriteFrame = charTypeConfig.sprite
        } else {
            cc.loader.load(charTypeConfig.sprite, (err, texture) => {
                if (err) {
                    cc.error('Failed to load sprite:', err)
                    return
                }
                const spriteFrame = new cc.SpriteFrame(texture)
                this.sprite.spriteFrame = spriteFrame
            })
        }
    },
    randomId() {
        let time = new Date().getTime()
        return time
    },
    updateHp(hp){
        this.hpProgress.progress = hp / this.hpMax
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
    initState(id){
        if (!this.fsm) {
            this._initStateMachine();
        }
        this._initValue(id);
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
