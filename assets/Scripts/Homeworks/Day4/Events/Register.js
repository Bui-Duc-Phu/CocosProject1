const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad() {
       
        
        Emitter.instance.registerEvent("HELLO", this.onHello.bind(this));
        Emitter.instance.registerOnce("WELCOME", this.onWelcome.bind(this));
    },
    onHello(data) {
        cc.log('Register', data);
    },
    onWelcome(data) {
        cc.log('Register', data);
    },

    start() {
    },
});