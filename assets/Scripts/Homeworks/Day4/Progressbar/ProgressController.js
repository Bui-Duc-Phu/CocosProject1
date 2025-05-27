
const ProgressEvent = require('ProgressEvent');

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: 0.1,
        }
    },

    testProgressbar(){
        ProgressEvent.instance.emit("updateCurrent", this.progressBar);
        this.progressBar += 0.1;
        if(this.progressBar > 1){
            this.progressBar = 0;
        }
    },
    dowloading(){
        ProgressEvent.instance.emit("dowloadingProgress", 5, 0.05);
    }
    
});
