cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        fontSize: {
            default: 30,
            displayName: 'Font Size(px)',
            type: cc.Integer,
            tooltip: 'Font size of the title'
        },
        lineHeight: {
            default: 30,
            displayName: 'Line Height(px)',
            type: cc.Integer,
            tooltip: 'Line height of the text'
        },
        overflow: {
            default: cc.Label.Overflow.NONE,
            type: cc.Label.Overflow,
            tooltip: 'Text overflow behavior'
        },
        labelText: {
            default: 'Title',
            tooltip: 'Text content of the title'
        },
        labelColor: {
            default: cc.Color.YELLOW,
            tooltip: 'Color of the title text'
        },
        isBold: {
            default: true,
            tooltip: 'Whether the title should be bold'
        },
        shadowEnabled: {
            default: true,
            tooltip: 'Whether to enable text shadow'
        }
    },

    start() {
        this._initializeLabel();
    },

    // Private methods
    _initializeLabel() {
        if (!this.label) return;
        
        this._setFontSize(this.fontSize);
        this._setLineHeight(this.lineHeight);
        this._setText(this.labelText);
        this._setColor(this.labelColor);
        this._setBold(this.isBold);
        this._setShadow(this.shadowEnabled);
        this._setOverflow(this.overflow);
    },
    _setBold(isBold) {
        this.isBold = isBold;
        if (this.label) {
            this.label.fontFamily = isBold ? 'Arial-Bold' : 'Arial';
        }
    },
    _setShadow(enabled) {
        this.shadowEnabled = enabled;
        if (this.label) {
            let shadow = this.label.node.getComponent(cc.LabelShadow);
            if (enabled && !shadow) {
                this.label.node.addComponent(cc.LabelShadow);
            } else if (!enabled && shadow) {
                this.label.node.removeComponent(cc.LabelShadow);
            }
        }
    },
    _setText(text) {
        if (this.label) {
            this.label.string = text;
        }
    },
    _setColor(color) {
        if (this.label) {
            this.label.node.color = color;
        }
    },
    _setFontSize(size) {
        if (this.label) {
            this.label.fontSize = size;
        }
    },
    _setLineHeight(height) {
        if (this.label) {
            this.label.lineHeight = height;
        }
    },
    _setOverflow(overflowType) {
        if (this.label) {
            this.label.overflow = overflowType;
        }
    },
    // Public methods
    increaseFontSize() {
        this.fontSize += 5;
        this._setFontSize(this.fontSize);
    },
    decreaseFontSize() {
        this.fontSize -= 5;
        this._setFontSize(this.fontSize);
    },
    increaseLineHeight() {
        this.lineHeight += 5;
        this._setLineHeight(this.lineHeight);
    },
    decreaseLineHeight() {
        this.lineHeight -= 5;
        this._setLineHeight(this.lineHeight);
    },
    changeColor(event, color) {
        const colorMap = {
            'Red': cc.Color.RED,
            'Green': cc.Color.GREEN,
            'Blue': cc.Color.BLUE,
            'Yellow': cc.Color.YELLOW,
            'White': cc.Color.WHITE
        };
        if (colorMap[color]) {
            this.labelColor = colorMap[color];
            this._setColor(this.labelColor);
        }
    },
    toggleBold() {
        this.isBold = !this.isBold;
        this._setBold(this.isBold);
    },
    setOverflow(event,type) {
        const overflowMap = {
            'NONE': cc.Label.Overflow.NONE,
            'SHRINK': cc.Label.Overflow.SHRINK,
            'CLAMP': cc.Label.Overflow.CLAMP,
            'RESIZE_HEIGHT': cc.Label.Overflow.RESIZE_HEIGHT,
            'RESIZE_WIDTH': cc.Label.Overflow.RESIZE_WIDTH
        };

        if (overflowMap[type]) {
            this._setOverflow(overflowMap[type]);
        }
    },

    addString(){
        this.labelText += 'xin chao cac ban';
        this._setText(this.labelText);
    },

});
