const EventDriver = require('EventDriver');
const mEmitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
    
    },
    showPopupRank() {
        mEmitter.instance.emit(EventDriver.SHOW_POPUP_RANK);
    },
    showPopupSetting() {
        mEmitter.instance.emit(EventDriver.SHOW_POPUP_SETTING);
    },
});
