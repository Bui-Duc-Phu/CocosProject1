const EventDriver = require('EventDriver');
const mEmitter = require('mEmitter');
const KeySence = require('KeySence');
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
    loadsence() {
        cc.director.preloadScene(KeySence.ROOM,
            (completedCount,totalCount)=> {
            },
            onComplete => {
                    cc.director.loadScene(KeySence.ROOM);
            }
        )
    }

});
