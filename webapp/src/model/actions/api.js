import { APIPath } from './../../apiConfig';
import { get as fetchGet, post as fetchPost } from './../../utils/fetch';

const SuccessCode = 'S200';
const bodyWrapper = function (response) {
    response.success = response && response.status && response.status.code == SuccessCode;

    return response;
};

//
// const mockMultiFetch = function (url, body, count) {
//     var promiseArr = [];
//     for (var i = 0; i < count; i++) {
//         promiseArr.push(fetchGet(url, Object.assign({}, body, { mockFetchIdx: i })));
//     }
//
//     return Promise.all(promiseArr);
// }


export const get = function (url, body) {
    return fetchGet(APIPath + url, body).then(bodyWrapper);
}

export const post = function (url, body) {
    return fetchPost(APIPath + url, body).then(bodyWrapper);
}

// export const get = function (url, body) {
//     return fetchGet(APIPath + url, body).then(bodyWrapper);
// }
//
// export const get = function (url, body) {
//     return fetchGet(APIPath + url, body).then(bodyWrapper);
// }

export const getAction = function (url, body) {
    return async dispatch => {
        // mockMultiFetch(APIPath + url, body, 7);
        var response = await fetchGet(APIPath + url, body);
        response = bodyWrapper(response);
        !response.success && dispatch({ type: 'COMMON_API_RESPONSE_ERROR', state: response.state });
        return response;
    }
}

export const postAction = function (url, body) {
    return async dispatch => {
        var response = await fetchPost(APIPath + url, body);
        response = bodyWrapper(response);
        !response.success && dispatch({ type: 'COMMON_API_RESPONSE_ERROR', state: response.state });
        return response;
    }
}
