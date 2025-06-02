cc.Class({
    extends: cc.Component,

    properties: {
    },

    start(){
        this.onAnimateNomal()
    },

    onAnimateNomal(){
        this.tween = cc.tween(this.node)
        this.tween.parallel(
            cc.tween().to(0.3, { scale: 1.5 },{easing: cc.easing.sineOut()}),
            cc.tween().to(0.3, { opacity: 0 },{easing: cc.easing.quadIn()})
        )
        .call(() => {
            this.node.destroy()
        })
        .start()
    },
    onDestroy() {
        if (this.tween) {
            this.tween.stop();
        }
    }
});
