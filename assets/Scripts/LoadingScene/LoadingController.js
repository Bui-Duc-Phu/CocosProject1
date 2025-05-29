
const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');
const KeySence = require('KeySence');
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad() {
        this.loadsence();
    },
    dowloading() {
        console.log("daloading")
        mEmitter.instance.emit(EventDriver.PROGRESS_BAR.DOWLOADING_PROGRESS, 5, 0.05);
    },
    loadsence() {
        cc.director.preloadScene(KeySence.LOBBY,
            (completedCount,totalCount)=> {
                let pecv = completedCount / totalCount;
                mEmitter.instance.emit(EventDriver.PROGRESS_BAR.UPDATE_CURRENT_PROGRESS, pecv);
            },
            onComplete => {
                setTimeout(() => {
                    cc.director.loadScene(KeySence.LOBBY);
                }, 500);
            }
        )
    }
});