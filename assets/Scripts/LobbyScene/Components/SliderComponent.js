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
        audioController:require('../Sounds/AudioController'),
    },
    onLoad() {
        this.initSlider();
    },
    initSlider() {
        if (this.slider) {
            this.slider.interactable = true;
            this.slider.progress = (this.currentValue - this.minValue) / (this.maxValue - this.minValue);
            this.slider.node.on('slide', this.onSliderChanged, this);
        }
    },
    onSliderChanged(slider) {
        if (!this.slider) return;
        this.currentValue = this.minValue + (this.maxValue - this.minValue) * this.slider.progress;
        this._updateSliderValue();
        this.audioController.setSystemVolume(this.currentValue/100);
    },
    _updateSliderValue() {
        if (!this.slider) return;
        this.slider.progress = (this.currentValue - this.minValue) / (this.maxValue - this.minValue);
    },
});
