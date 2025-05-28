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

    show(dataObject) {
        this.container.removeAllChildren();
        const itemCount = Object.keys(dataObject).length;
        for (let i = 0; i < itemCount; i++) {
            const itemNode = cc.instantiate(this.itemPrefab);
            this.container.addChild(itemNode);
            
            const itemScript = itemNode.getComponent("ItemCell");
            const data = dataObject[i];
            if (data) {
                itemNode.active = true;
                itemScript.updateData(data);
            } else {
                itemNode.active = false;
            }
        }
    },
});
