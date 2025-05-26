cc.Class({
    extends: cc.Component,
    properties: {
        audioController: cc.Node
    },
    onLoad() {
        this.audio = this.audioController.getComponent('AudioController');
    },
    onSoundClick() {
        if (!this.audio)  return;
        this.audio.onSoundClick();
    },
    setSystemVolume(volume) {
        this.audio.setSystemVolume(volume);
    }
});
