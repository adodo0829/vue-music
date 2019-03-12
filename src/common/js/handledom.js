// 抽离公共的 DOM操作方法

// 判断是否有类名
function hasClass(el, className) {

    return el.className.split(/\s+/).includes(className)
}

// 添加类名
function addClass(el, className) {
    // 先判断是否存在
    if (hasClass(el, className)) {
        return
    }
    let newClassList = el.className.split(/\s+/)
    newClassList.push(className)
    el.className = newClassList.join(' ')
}

export {
    addClass,
    hasClass
}


