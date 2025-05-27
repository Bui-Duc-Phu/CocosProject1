const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');
cc.Class({
    extends: cc.Component,

    properties: {
        popupRankNode: cc.Node,
        popupSettingNode: cc.Node
    },
    onLoad() {
        this._initValue();
        this._registerEvent();
    },
    onStart() {
        this.popupRank.hide();
        this.popupSetting.hide();
    },
    showPopupRank() {
        this.popupRank.show();
    },
    showPopupSetting() {
        this.popupSetting.show();
    },
    _initValue(){
        this.popupRank = this.popupRankNode.getComponent('PopupRank');
        this.popupSetting = this.popupSettingNode.getComponent('PopupSetting');
    },
    _registerEvent(){
        mEmitter.instance.registerEvent(EventDriver.SHOW_POPUP_RANK, this.showPopupRank.bind(this));
        mEmitter.instance.registerEvent(EventDriver.SHOW_POPUP_SETTING, this.showPopupSetting.bind(this));
    },
    onDestroy() {
        mEmitter.instance.removeEvent(EventDriver.SHOW_POPUP_RANK, this.showPopupRank.bind(this));
        mEmitter.instance.removeEvent(EventDriver.SHOW_POPUP_SETTING, this.showPopupSetting.bind(this));
    }
});
