
cc.Class({
    extends: cc.Component,

    properties: {
        PopupController: require('./Popups/PopupController'),
    },

    showPopupRank() {
        this.PopupController.showPopupRank();
    },
    hidePopupRank() {
        this.PopupController.hidePopupRank();
    },
    showPopupSetting() {
        this.PopupController.showPopupSetting();
    },
    hidePopupSetting() {
        this.PopupController.hidePopupSetting();
    },
});
