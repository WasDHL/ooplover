var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

const windowVisibleEventsPool = [];

export function bindWindowVisibleChange (callback) {
    if (!windowVisibleEventsPool.indexOf(callback) > -1) { windowVisibleEventsPool.push(callback); }
}

export function unBindWindowVisibleChange (callback) {
    var idx = windowVisibleEventsPool.indexOf(callback) > -1;
    if (idx > -1) { windowVisibleEventsPool.splice(idx, 1); }
}

// 添加监听器
document.addEventListener(visibilityChange, function() {
    console.log("当前页面是否被隐藏：" + document[hidden]);
    for (var i = 0; i < windowVisibleEventsPool.length; i++) {
        var callback = windowVisibleEventsPool[i];
        callback && typeof callback == 'function' && callback(document[hidden]);
    }
}, false);