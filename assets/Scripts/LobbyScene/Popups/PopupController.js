cc.Class({
    extends: cc.Component,

    properties: {
        popupRankNode: cc.Node,
        popupSettingNode: cc.Node
    },
    onLoad() {
        this.popupRank = this.popupRankNode.getComponent('PopupRank');
        this.popupSetting = this.popupSettingNode.getComponent('PopupSetting');

        console.log('popupSettingNode:', this.popupSettingNode);
        console.log('popupSetting:', this.popupSetting);

    },
    onStart() {
        this.popupRank.hide();
        this.popupSetting.hide();
    },
    showPopupRank() {
        this.popupRank.show();
    },
    hidePopupRank() {
        this.popupRank.hide();
    },
    showPopupSetting() {
        this.popupSetting.show();
    },
    hidePopupSetting() {
        this.popupSetting.hide();
    },
});
