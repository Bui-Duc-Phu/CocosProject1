const SprineEvent = require('SprineEvent');
cc.Class({
    extends: cc.Component,

    properties: {
        layoutController: require('LayoutController'),
        spineController: require('SprineController'),
    },

    onLoad(){
        const animList = this.spineController.getAllAnimNames();   
        const list = animList.map((item, index) => ({
            title: item,
        }));
        this.layoutController.show(list)
    },



   
});
