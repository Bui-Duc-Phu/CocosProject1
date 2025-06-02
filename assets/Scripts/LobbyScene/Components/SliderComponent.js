const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');
cc.Class({
    extends: cc.Component,

    properties: {
        slider: {
            default: null,
            type: cc.Slider,
            tooltip: 'The slider component reference'
        },
        minValue: {
            default: 0.00001,
            tooltip: 'Minimum value of the slider'
        },
        maxValue: {
            default: 100,
            tooltip: 'Maximum value of the slider'
        },
        currentValue: {
            default: 0.00001,
            tooltip: 'Current value of the slider',
            notify: function() {
                this._updateSliderValue();
            }
        },
        background: {
            default: null,
            type: cc.Sprite,
            tooltip: 'Background node'
        },
        backgroundForce: {
            default: null,
            type: cc.Sprite,
            tooltip: 'Background force'
        },
    },
    onLoad() {
        this.initSlider();
    },
    initSlider() {
        if (this.slider) {
            this.slider.interactable = true;
            this.slider.progress = (this.currentValue - this.minValue) / (this.maxValue - this.minValue);
            this.backgroundForce.node.width = this.background.node.width * this.slider.progress;
            this.slider.node.on('slide', this.onSliderChanged, this);
        }
    },
    onSliderChanged(slider){
        this.currentValue = this.minValue + (this.maxValue - this.minValue) * this.slider.progress;
        this._updateSliderValue();
        mEmitter.instance.emit(EventDriver.SET_VOLUME_SYSTEM, this.currentValue/100);
    },
    _updateSliderValue() {
        this.slider.progress =(this.currentValue - this.minValue) / (this.maxValue - this.minValue);
        this.backgroundForce.node.width = this.background.node.width * this.slider.progress;
    },
    onDestroy() {
        this.slider.node.off('slide', this.onSliderChanged, this);
    }
});
