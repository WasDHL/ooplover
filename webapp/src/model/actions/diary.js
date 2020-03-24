import { get, getAction, post, postAction } from './api';
import asyncActionStateTracker from './../../utils/asyncActionStateTracker';

// var get = function () {
//     console.log(arguments);
//
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 400);
//     });
// }

// const urlMap = {
//     'list': `${APIPath}/diary/list`
// };

const actionMap = {
    fetchDiaryList: function (userId) {
        return async function (dispatch) {
            // var response = await get('/diary/list');
            var response = await dispatch(getAction('/diary/list'));
            response.success && dispatch({ type: 'FETCHED_DIARYLIST', diaryList: response.data || [] });
            return response.data;
        }
    },
    fetchDiaryDetail: function (id) {
        return async function (dispatch) {
            var response = await dispatch(getAction('/diary/query?id=' + id));
            response.success && dispatch({ type: 'FETCHED_DIARYDETAIL', diaryDetail: response.data || [] });
            return response.data;
        }
    },
    submitDiary: function (diary) {
        return async function (dispatch) {
            var id = diary.id;
            var response = diary.id ?
                await dispatch(postAction('/diary/update', diary)) :
                await dispatch(postAction('/diary/create', diary));

            // var response = await dispatch(postAction('/diary'));

            return response;
        }
    },
    deleteDiary: function (id) {
        return async function (dispatch) {
            return await dispatch(postAction('/diary/remove', { id }));
        }
    }
}

export const fetchDiaryList = asyncActionStateTracker(actionMap['fetchDiaryList'], "isFetchingDiaryList");
export const fetchDiaryDetail = asyncActionStateTracker(actionMap['fetchDiaryDetail'], "isFetchingDiaryDetail");
export const submitDiary = asyncActionStateTracker(actionMap['submitDiary'], "isSubmittingDiary");
export const deleteDiary = asyncActionStateTracker(actionMap['deleteDiary'], "isDelettingDiary");
