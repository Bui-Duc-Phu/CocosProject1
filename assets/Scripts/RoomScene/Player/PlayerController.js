cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 2000, // Movement speed in pixels per second
    },

    start () {
        // Enable keyboard input
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
        // Initialize key states
        this.keys = {
            w: false,
            s: false,
            a: false,
            d: false
        };
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.keys.w = true;
                break;
            case cc.macro.KEY.s:
                this.keys.s = true;
                break;
            case cc.macro.KEY.a:
                this.keys.a = true;
                break;
            case cc.macro.KEY.d:
                this.keys.d = true;
                break;
        }
    },

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.keys.w = false;
                break;
            case cc.macro.KEY.s:
                this.keys.s = false;
                break;
            case cc.macro.KEY.a:
                this.keys.a = false;
                break;
            case cc.macro.KEY.d:
                this.keys.d = false;
                break;
        }
    },

    update(dt) {
        // Handle movement in update
        if (this.keys.w) {
            this.node.y += this.moveSpeed * dt;
        }
        if (this.keys.s) {
            this.node.y -= this.moveSpeed * dt;
        }
        if (this.keys.a) {
            this.node.x -= this.moveSpeed * dt;
        }
        if (this.keys.d) {
            this.node.x += this.moveSpeed * dt;
        }
    }
});
