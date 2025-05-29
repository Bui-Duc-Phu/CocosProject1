const EventDriver = require('EventDriver');
const mEmitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        onTouchEnd: {
            default: false,
            type: cc.Boolean,
            tooltip: 'Register event on touch end and off touch start'
        }
    },
    onLoad() {
        this.button = this.node.getComponent(cc.Button);
        this._registerEvent();
    },
    onButtonClick() {
        mEmitter.instance.emit(EventDriver.ON_CLICK_SOUND);
    },
    _registerEvent(){
        if (this.onTouchEnd) {
            this.button.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
            return;
        } 
        this.button.node.on(cc.Node.EventType.TOUCH_START, this.onButtonClick, this);
    },
  
});
