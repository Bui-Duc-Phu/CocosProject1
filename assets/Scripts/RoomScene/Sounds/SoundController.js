// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
            type: cc.Float,
            default: 0.8
        }
    },
    playSoundBGM(){
       this.bgmid = cc.audioEngine.play(this.soundBGM, true, this.volume);
    },
    onSoundClick(){
        cc.audioEngine.playMusic(this.soundClick, false, this.volume);
    },

    increaseVolume() {
        this.volume = Math.min(1.0, this.volume + 0.1);
        cc.audioEngine.setMusicVolume(this.volume);
        cc.audioEngine.setVolume(this.bgmid, this.volume);
    },
    decreaseVolume() {
        this.volume = Math.max(0, this.volume - 0.1);
        cc.audioEngine.setMusicVolume(this.volume);
        cc.audioEngine.setVolume(this.bgmid, this.volume);
    },
    onLoad () {
       this.bgmid = null
       this.playSoundBGM();
       console.log(this.bgmid);
    },
    start () {
    },
});
