cc.Class({
    extends: cc.Component,

    properties: {
        soundBGM: {
            type: cc.AudioClip,
            default: null
        },
        soundClick: {
            type: cc.AudioClip,
            default: null
        },
        volume: {
            default: 0.8,
            tooltip: 'Volume of the audio'
        },
        volumeBGM: {
            default: 0.8,
            tooltip: 'Volume of the audio'
        },
    },
    onLoad () {
        this._localVariable();
        this._playSoundBGM();
      
    },
    setBGM(isOn) {
        if (this.bgmId == null) return;
        this.volumeBGM = isOn ? this.volume : 0;
        cc.audioEngine.setVolume(this.bgmId, this.volumeBGM);
    },
    setSystemVolume(volume) {
        this.volume = volume;
        if (this.volumeBGM != 0) {
            this.volumeBGM = this.volume;
        }
        this._setSystemVolume(volume);
    },
    onSoundClick() {
        this._playSoundClick();
    },
    _localVariable() {
        this.bgmId = null;
        this.clickId = null;
    },
    _playSoundBGM() {
        this.bgmId = cc.audioEngine.play(this.soundBGM, true, this.volume);
    },
    _playSoundClick() {
        this.clickId = cc.audioEngine.play(this.soundClick, false, this.volume); 
    },
    _setSystemVolume(volume) {
        if (this.bgmId !== null && this.volumeBGM != 0) {
            cc.audioEngine.setVolume(this.bgmId, volume);
        }
        if (this.clickId !== null && cc.audioEngine.getState(this.clickId) === cc.audioEngine.AudioState.PLAYING) {
            cc.audioEngine.setVolume(this.clickId, volume);
        }
    },
});
