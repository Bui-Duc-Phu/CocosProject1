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
        colors: {
            default: null
        }
    },
    onLoad() {
        this.colors = {
            TOP_1: "#A80808",
            TOP_2: "#C9DA05",
            TOP_3: "#330CFC",
            OTHERS: "#4C155E"
        };
        this._initCells();
        this._registerEvent();
    },
    show(dataList) {
        console.log("dataList",dataList)
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
    _getColorByRank(index) {
        switch (index) {
            case 0: return "#A80808";  
            case 1: return "#C9DA05";  
            case 2: return "#330CFC";  
            default: return "#4C155E"; 
        }
    }
});
