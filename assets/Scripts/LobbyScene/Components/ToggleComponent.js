cc.Class({
    extends: cc.Component,

    properties: {
        slider: {
            default: null,
            type: cc.Slider,
            tooltip: 'The slider component to control'
        },
        targetNode: {
            default: null,
            type: cc.Node,
            tooltip: 'The node whose alpha will be changed'
        },
        minPosition: {
            default: 0.3,
            tooltip: 'Minimum position of the slider'
        },
        maxPosition: {
            default: 0.7,
            tooltip: 'Maximum position of the slider'
        },
        isOn: {
            default: true,
            visible: false
        },
        audioController:require('../Sounds/AudioController'),
         
    },
    onLoad() {
        this.updateToggleState(this.isOn);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onToggleClick, this);
    },
    onToggleClick() {
        this.isOn = !this.isOn;
        this.updateToggleState(this.isOn);
        if (this.audioController) {
            if (this.isOn) {
                this.audioController.setBGM(this.isOn);
            } else {
                this.audioController.setBGM(this.isOn);
            }
        }
    },
    updateToggleState(isOn) {
        if (this.slider) {
            this.slider.progress = isOn ?  this.maxPosition : this.minPosition;
        }
        if (this.targetNode) {
            const alpha = isOn ? 255 : 150;
            this.targetNode.opacity = alpha;
        }
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onToggleClick, this);
    }
});
