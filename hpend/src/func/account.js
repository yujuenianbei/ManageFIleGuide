const transSex = (data) => {
    if (data === 0) {
        return "男"
    } else if(data === 1) {
        return "女"
    }
}
const transToSex = (data) => {
    if (data === "男") {
        return 0
    } else if (data === "女"){
        return 1
    }
}
const editTransToSex = (data) => {
    if (data.sex === "男") {
        data.sex = 0
    } else if (data.sex === "女"){
        data.sex = 1
    }
}

export { transSex, transToSex, editTransToSex }