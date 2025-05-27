const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');

cc.Class({
    extends: cc.Component,

    properties: {
        slider: {
            default: null,
            type: cc.Slider,
            tooltip: 'The slider component to control'
        },
        targetNode: {
            default: null,
            type: cc.Node,
            tooltip: 'The node whose alpha will be changed'
        },
        minPosition: {
            default: 0.3,
            tooltip: 'Minimum position of the slider'
        },
        maxPosition: {
            default: 0.7,
            tooltip: 'Maximum position of the slider'
        },
        isOn: {
            default: true,
            visible: false
        },
        background: {
            default: null,
            type: cc.Sprite,
            tooltip: 'Background node'
        },
    },
    onLoad() {
        this._initValue();
        this._updateToggleState(this.isOn);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onToggleClick, this);
    },
    onToggleClick() {
        this.isOn = !this.isOn;
        this._updateToggleState(this.isOn);
        mEmitter.instance.emit(EventDriver.BGM_TOGGLE, this.isOn);
    },
    _initValue(){
        this.colorOn = new cc.Color(13,223,89,255);
        this.colorOff = new cc.Color(255,255,255,255);
    },
    _updateToggleState(isOn) {
        this.slider.progress = isOn ?  this.maxPosition : this.minPosition;
        this.background.node.color = isOn ? this.colorOn : this.colorOff;
        if (this.targetNode) {
            const alpha = isOn ? 255 : 150;
            this.targetNode.opacity = alpha;
        }
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onToggleClick, this);
    }
});

