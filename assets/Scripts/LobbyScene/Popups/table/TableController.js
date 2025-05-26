cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        container: {
            default: null,
            type: cc.Node,
            tooltip: "Container node with Layout component"
        },
        colors: {
            default: null,
            visible: true
        }
    },
    onLoad() {
        this.colors = {
            TOP_1: "#A80808",
            TOP_2: "#C9DA05",
            TOP_3: "#330CFC",
            OTHERS: "#4C155E"
        };
        this.layoutConfig = {
            spacing: 10,
            type: 1 
        };
        this.playerData = [
            { name: "Faker", Champion: "Leblanc", rank: "Thách Đấu" },
            { name: "ShowMaker", Champion: "Sylas", rank: "Cao Thủ" },
            { name: "Chovy", Champion: "Viktor", rank: "Cao Thủ" },
            { name: "Keria", Champion: "Thresh", rank: "Cao Thủ" },
            { name: "Gumayusi", Champion: "Jinx", rank: "Cao Thủ" }
        ];
    },
    start() {
        this._initLayout();
        this.populateList(this.playerData);
    },
    populateList(dataList) {
        this.container.removeAllChildren();
        dataList.forEach((data, index) => {
            const itemNode = this._createListItem(data, index);
            this.container.addChild(itemNode);
        });
        const layout = this.container.getComponent(cc.Layout);
        if (layout) {
            layout.updateLayout();
        }
    },
    _initLayout() {
        let layout = this.container.getComponent(cc.Layout);
        if (!layout) {
            layout = this.container.addComponent(cc.Layout);
        }
        layout.type = cc.Layout.Type.VERTICAL;
        layout.spacingY = this.layoutConfig.spacing;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
    },
    _getColorByRank(index) {
        switch (index) {
            case 0: return this.colors.TOP_1;
            case 1: return this.colors.TOP_2;
            case 2: return this.colors.TOP_3;
            default: return this.colors.OTHERS;
        }
    },
    _createListItem(data, index) {
        const itemNode = cc.instantiate(this.itemPrefab);
        const itemScript = itemNode.getComponent("ItemCell");
        const color = this._getColorByRank(index);
        itemScript.updateData(data, color, index);
        return itemNode;
    }
});
