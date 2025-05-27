const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        container: {
            default: null,
            type: cc.Node,
            tooltip: "Container node with Layout component"
        },
    },
    onLoad() {
        this._initValue();
        this._initCells();
    },
    start() {
      this.show(this.playerData);
    },
    show(dataList) {
        for (let i = 0; i < this.container.children.length; i++) {
            const itemNode = this.container.children[i];
            const itemScript = itemNode.getComponent("ItemCell");
            const data = i < dataList.length ? dataList[i] : null;
            const color = this._getColorByRank(i);
            if (data) {
                itemNode.active = true;
                itemScript.updateData(data, color, i);
            } else {
                itemNode.active = false;
            }
        }
    },
    _registerEvent(){
        mEmitter.instance.registerEvent(EventDriver.OBSERVER_DATA_RANK, this.show.bind(this));
    },
    _initCells() {
        for (let i = 0; i < 5; i++) {
            const itemNode = cc.instantiate(this.itemPrefab);
            this.container.addChild(itemNode);
        }
    },
    _initValue(){
        this.colors = {
            TOP_1: "#A80808",
            TOP_2: "#C9DA05",
            TOP_3: "#330CFC",
            OTHERS: "#4C155E"
        }
        this.playerData = [
            { name: "Faker", Champion: "Leblanc", rank: "Thách Đấu" },
            { name: "ShowMaker", Champion: "Sylas", rank: "Cao Thủ" },
            { name: "Chovy", Champion: "Viktor", rank: "Cao Thủ" },
            { name: "Keria", Champion: "Thresh", rank: "Cao Thủ" },
            { name: "Gumayusi", Champion: "Jinx", rank: "Cao Thủ" }
        ];
    },
    _getColorByRank(index) {
        switch (index) {
            case 0: return this.colors.TOP_1;
            case 1: return this.colors.TOP_2;
            case 2: return this.colors.TOP_3;
            default: return this.colors.OTHERS;
        }
    }
});
