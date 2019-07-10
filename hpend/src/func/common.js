const timestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();
    return Y + M + D + h + m + s;
}

// 产品类别对应关系
const typeToTypeName = (list, id) => {
    return list.filter(item =>item.id === id)[0].typeName
}
const typeNameToType = (list, id) => {
    return list.filter(item =>item.typeName === id)[0].id
}

export { timestampToTime, typeToTypeName, typeNameToType }