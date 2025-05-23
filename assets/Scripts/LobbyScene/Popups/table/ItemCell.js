cc.Class({
    extends: cc.Component,

    properties: {
        index: cc.Label,
        userName: cc.Label,
        score: cc.Label,
        data: null,
    },

    updateData(data) {
        this.data = data;
        if (this.index) {
            this.index.string = data.index || '';
        }
        if (this.name) {
            this.name.string = data.name || '';
        }
        if (this.score) {
            this.score.string = data.score || '';
        }
    },

});
