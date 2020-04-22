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