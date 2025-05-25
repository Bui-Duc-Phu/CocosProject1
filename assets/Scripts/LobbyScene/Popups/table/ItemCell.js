cc.Class({
    extends: cc.Component,

    properties: {
        layout: {
            default: null,
            type: cc.Layout
        },
        label1: {
            default: null,
            type: cc.Label
        },
        label2: {
            default: null,
            type: cc.Label
        },
        label3: {
            default: null,
            type: cc.Label
        },
        topSprite: {
            default: null,
            type: cc.Sprite
        },
        topLabel: {
            default: null,
            type: cc.Label
        },
        radiusSprite: {
            default: null,
            type: cc.Sprite
        }
    },
    updateData(data, color, index) {
        if (!data) {
            console.log("data is null");
            return;
        }
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const parsedColor = new cc.Color(r, g, b);

        const { name, Champion, rank } = data; 
        this.label1.string = name;
        this.label2.string = Champion;
        this.label3.string = rank;
        if (this.radiusSprite) {
            this.radiusSprite.node.color = parsedColor;
        }
        if (this.topSprite) {
            this.topSprite.node.color = parsedColor;
        }
        this.topLabel.string = (index + 1).toString(); 
    }
    
});
