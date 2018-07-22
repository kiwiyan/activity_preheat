export default {
    // 给循环列表数据添加id
    addVForKey(list) {
        return list.map((value, index) => {
            value.id = index;
            return value;
        })
    }
}