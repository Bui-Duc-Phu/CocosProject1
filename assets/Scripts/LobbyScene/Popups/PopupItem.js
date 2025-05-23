
cc.Class({
    extends: cc.Component,

    properties: {
    },
    show(data) {
        this.node.active = true;
    },

    hide() {
        this.node.active = false;
    },

    onLoad() {
        this.hide();
    }

});
