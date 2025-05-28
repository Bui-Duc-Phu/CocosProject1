const SprineEvent = require('SprineEvent');
cc.Class({
    extends: cc.Component,

    properties: {
        title: {
            default: null,
            type: cc.Label
        },
        button: {
            default: null,
            type: cc.Button
        }
    },
    updateData (item) {
        this.title.string = item.title;
    },
    onLoad(){
        this.button.node.on(cc.Node.EventType.TOUCH_START, this.onButtonClick, this);
    },
    onButtonClick(){
        SprineEvent.instance.emit("RUN_ANIM", this.title.string);
    }

 

});
