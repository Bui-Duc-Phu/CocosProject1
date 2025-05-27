const ProgressEvent = require('ProgressEvent');
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: null,
            type: cc.ProgressBar,
            tooltip: "Progress bar component"
        },
        progressValue: {
            default: 0,
            range: [0, 1],
            tooltip: "Current progress value (0-1)"
        },
        persenLabel: {
            default: null,
            type: cc.Label,
            tooltip: "Persentage label"
        }
    },
    onLoad() {
        this._initValue();
        this._registerEvent();
    },
    _registerEvent(){
        ProgressEvent.instance.registerEvent("updateCurrent", this._updateCurrentProgress.bind(this), this);
        ProgressEvent.instance.registerEvent("dowloadingProgress", this._dowloading.bind(this), this);
    },
    _onChange(value) {
        this.progressValue = Math.max(0, Math.min(1, value));
        this._updateProgress();
    },
    _updateProgress() {
        if (this.progressBar) {
            this.progressBar.progress = this.progressValue;
        }
        if (this.persenLabel) {
            this.persenLabel.string = `${Math.floor(this.progressValue * 100)}%`;
        }
    },
    _updateCurrentProgress(value){
        this.progressValue = Math.max(0, Math.min(1, value));
        this._updateProgress();
    },
    _dowloading(seconds,updateInterval) {
        this.progressValue = 0;
        this._updateProgress();
        let duration = seconds; 
        let steps = duration / updateInterval;
        let stepValue = 1.0 / steps;

        let currentStep = 0;
        this.schedule(() => {
            if (currentStep < steps) {
                this.progressValue += stepValue;
                this._updateProgress();
                currentStep++;
            }
        }, updateInterval, steps);
    },
    _initValue(){
        this.progressBar.progress = this.progressValue;
    },
});
