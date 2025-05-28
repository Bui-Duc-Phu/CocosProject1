
const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: 0.1,
        }
    },

    start() {
        this.dowloading();
    },
    testProgressbar(){
        mEmitter.instance.emit(EventDriver.PROGRESS_BAR.UPDATE_CURRENT_PROGRESS, this.progressBar);
        this.progressBar += 0.1;
        if(this.progressBar > 1){
            this.progressBar = 0;
        }
    },
    dowloading(){
        console.log("daloading")
        mEmitter.instance.emit(EventDriver.PROGRESS_BAR.DOWLOADING_PROGRESS, 5, 0.05);
    },


    
});