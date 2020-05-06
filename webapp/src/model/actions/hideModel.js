import { checkMessageReadedCondition } from './message';

export const toggleHideModel = function (visible) {
    return ({ type: 'TOGGLE_HIDE_MODEL', visible: visible });
}

window.GetDreamStatus = function () {
    return window.localStorage.getItem('DREAM_STATUS');
}

window.expandStepCount = 0;
window.refreshFlag = null;

// window.ExpandDream = function () {
//     window.expandStepCount = window.expandStepCount + 1;

//     if (window.expandStepCount > 2) {
//         window.localStorage.setItem('DREAM_STATUS', 'expanded');

//         document.getElementById('J_appHideModel').style.display = 'none';
//         document.getElementById('J_appCollapseBtn').style.display = 'block';
//         window.expandStepCount = 0;
//     }

//     window.clearTimeout(window.refreshFlag)
//     window.refreshFlag = setTimeout(function () {
//         window.expandStepCount = 0;
//     }, 1000);
// };

// window.CollapseDream = function () {
//     window.localStorage.setItem('DREAM_STATUS', 'collapsed');

//     document.getElementById('J_appHideModel').style.display = 'block';
//     document.getElementById('J_appCollapseBtn').style.display = 'none';
// };

window.checkBtnArr = [3,2,1];
window.btnSortStatus = {};
window.updateSortStatus = function (btnKey) {
    var result;

    if (!btnKey || window.checkBtnArr.indexOf(btnKey) < 0) { 
        result = false; 
    } else if (btnKey && window.btnSortStatus[btnKey]) { 
        result = false; 
    } else {
        var btnIndex = window.checkBtnArr.indexOf(btnKey);
        for (var i = 0; i < btnIndex; i++) {
            if (window.btnSortStatus[window.checkBtnArr[i]]) {
                continue;
            } else {
                break;
            }
        }
        if (i == btnIndex) {
            result = true; 
        } else {
            result = false; 
        }
    }
    if (result) {
        window.btnSortStatus[btnKey] = true;
    } else {
        window.btnSortStatus = {};
    }
    return window.btnSortStatus;
}
window.getSortStatus = function () {
    var result = true;
    for (var i = 0; i < window.checkBtnArr.length; i++) {
        result = result && window.btnSortStatus[window.checkBtnArr[i]]
    }
    return result;
}

export const tryExpandDream = function (tryOpen, btnKey) {
    return function (dispatch) {
        if (tryOpen) {
            window.expandStepCount = window.expandStepCount + 1;
            console.log(btnKey)
            window.updateSortStatus(btnKey);
        } else {
            window.expandStepCount = 0;
            window.updateSortStatus(90000);
        }
    
        window.clearTimeout(window.refreshFlag)
        window.refreshFlag = setTimeout(function () {
            // window.expandStepCount = 0;
            // window.updateSortStatus(90000);
        }, 1000);

        // if (window.expandStepCount > 2) {
        if (window.getSortStatus()) {
            window.localStorage.setItem('DREAM_STATUS', 'expanded');
            setTimeout(function () {
                dispatch(checkMessageReadedCondition());
            }, 500);
            return dispatch(toggleHideModel('expanded'))
        } else {
            return dispatch(toggleHideModel('collapsed'));
        }
    }
    
}


export const expandDream = function () {
    return function (dispatch) {
        window.expandStepCount = window.expandStepCount + 1;

        if (window.expandStepCount > 2) {
            window.localStorage.setItem('DREAM_STATUS', 'expanded');

            setTimeout(function () {
                dispatch(checkMessageReadedCondition());
            }, 500);

            return dispatch(toggleHideModel('expanded'));

            // document.getElementById('J_appHideModel').style.display = 'none';
            // document.getElementById('J_appCollapseBtn').style.display = 'block';
            // window.expandStepCount = 0;
        }

        window.clearTimeout(window.refreshFlag)
        window.refreshFlag = setTimeout(function () {
            window.expandStepCount = 0;
        }, 1000);

        return dispatch(toggleHideModel('collapsed'));
    }

    
}

export const collapseDream = function () {
    window.localStorage.setItem('DREAM_STATUS', 'collapsed');
    window.updateSortStatus(90000);
    return toggleHideModel('collapsed');
}

export const toggleDomWindowVisible = function (visible) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch(checkMessageReadedCondition());
        }, 500);

        return dispatch({ type: 'TOGGLE_DOM_WINDOW_VISIBLE', visible });
    }
}