const transSex = (data) => {
    if (data === 0) {
        return "男"
    } else {
        return "女"
    }
}
const transToSex = (data) => {
    if (data === "男") {
        return 0
    } else {
        return 1
    }
}

export { transSex, transToSex }