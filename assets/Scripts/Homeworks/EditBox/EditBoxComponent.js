cc.Class({
    extends: cc.Component,

    properties: {
        editBox: {
            default: null,
            type: cc.EditBox
        }
    },

    onLoad() {
        this.editBox.node.on('text-changed', this.onTextChanged, this);
    },

    onTextChanged(editBox) {
        // Log the current text content
        console.log('Text changed:', editBox.string);
    },

    start() {

    },
});
