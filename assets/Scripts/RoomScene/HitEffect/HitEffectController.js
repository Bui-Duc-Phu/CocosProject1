const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
cc.Class({
    extends: cc.Component,

    properties: {
        _hitEffectPrefab: cc.Prefab,
    },

    onLoad() {
        this._initValue()
        this._registerEvent()
    },

    onDestroy() {
        this._removeEvent()
    },

    _initValue() {
        this._listHitEffect = []
    },

    _createHitEffect(char, posWorld, bullet) {
        const pos = this.node.convertToNodeSpaceAR(posWorld)
        const hitEffect = cc.instantiate(this._hitEffectPrefab)
        const hitEffectItem = hitEffect.getComponent('HitEffectItem')
        this._listHitEffect.push(hitEffectItem)
        hitEffect.setParent(this.node)
        hitEffect.setPosition(pos)
    },

    _registerEvent() {
        mEmitter.instance.registerEvent(EventDriver.CHARACTER.ON_HIT, this._createHitEffect.bind(this))
    },

    _removeEvent() {
        mEmitter.instance.removeEvent(EventDriver.CHARACTER.ON_HIT, this._createHitEffect.bind(this))
    }
});
