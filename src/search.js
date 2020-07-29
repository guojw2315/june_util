
/**
 * @description 广度优先遍历树形数组 - 循环实现
 */
export function bfs(treeList, callback, { childrenKey = 'children', key = 'key' } = {}) {
    let queue = [[]];
    let list = treeList;
    let level = 1;
    let parentKeyMap = {};
    while (queue.length) {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
            let item = Object.create(list[i]);

            item._level = level;

            for (let keyItem of Object.keys(parentKeyMap)) {
                let keyItemList = keyItem.split('_');
                if (level - 1 == keyItemList[0] && i >= +keyItemList[1] && i <= +keyItemList[2]) {
                    item.parentKey = parentKeyMap[keyItem];
                }
            }

            if (item[childrenKey]) {
                parentKeyMap[`${level}_${temp.length}_${temp.length + item[childrenKey].length - 1}`] = item[key];
                temp = [...temp, ...item[childrenKey]];
            }

            if (callback) {
                let isBreak = callback({ ...item, ...list[i] }, list[i]);
                if (isBreak) return;
            }

            if (i === list.length - 1) {
                level++;
                queue.splice(1, 0, temp);
            }
        }

        list = queue.pop();
    }
}


/**
 * @description 深度优先遍历树形数组 - 循环实现
 * @param {*} treeList [{key, name}, ...]
 * @param {*} callback ({key:T, name:dynamic, level:int, parentKey:T})
 */
export function dfs(treeList, callback, { childrenKey = 'children', key = 'key' } = {}) {
    if (!treeList) return console.warn('target must be array')
    let queue = [[]];
    let list = treeList;
    let parentKeyMap = {};
    while (queue.length) {
        for (let i = 0; i < list.length; i++) {
            let item = Object.create(list[i]);
            item._level = queue.length;
            item.level = queue.length;
            if (parentKeyMap[item._level - 1])
                item.parentKey = parentKeyMap[item._level - 1];
            if (callback) {
                let isBreak = callback({ ...item, ...list[i] }, list[i]);

                if (isBreak) return;
            }


            if (item[childrenKey]) {
                parentKeyMap[item._level] = item[key];
                queue.push(list.slice(i + 1));
                queue.push(item[childrenKey]);

                break;
            }

        }
        list = queue.pop();
    }
}
