
cc.Class({
    extends: cc.Component,

    properties: {
        PopupRank: require('./PopupRank'),
        PopupSetting: require('./PopupSetting'),
    },

    showPopupRank() {
        let data = {}
        this._showPopup('PopupRank',data);
    },
    hidePopupRank() {
        this._hidePopup('PopupRank');
    },
    showPopupSetting() {
        let data = {}
        this._showPopup('PopupSetting',data);
    },
    hidePopupSetting() {
        this._hidePopup('PopupSetting');
    },

    _showPopup(popupName, data) {
        const popup = this[popupName];
        if (popup) {
            popup.show(data);
        }
    },
    _hidePopup(popupName) {
        const popup = this[popupName];
        if (popup) {
            popup.hide();
        }
    },








});
