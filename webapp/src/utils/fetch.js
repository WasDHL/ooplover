import Reqwest from 'reqwest';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'X-Requested-With'
};

export const absoluteUrl = function (url, body) {
    var queryStr = '';
    var queryArr = Object.keys(body).map(key => `${key}=${body[key]}`);
    queryStr = queryArr && queryArr.length > 0 && queryArr.join('&');

    if (!queryStr) { return url; }
    var spliter = url && url.indexOf('?') > -1 ? '&' : '?';

    return `${url}${spliter}${queryStr}`;
}

const vanillaFetch = window.fetch && typeof window.fetch == 'function';

const fetchAuthenticationReject = function (response) {
    if (response.status == '401') {
        window.location.href = '/#/login';
        throw {'code': '401'};
        return null;
    }
    return response;
}

const fetchFailreHandle = function (response) {
    // TODO
    return response;
}

const fetchLog = function (url, response) {
    console.log("Response From Url : " + url);
    console.log(response);

    return response;
}






// const interceptors = {
//     'requests':
// };

// const authHeaderWrapper = function () {
//     let token = document.cookie
//     return Object.assign({}, headers, {
//         'Authorization': 'Bearer ' + token
//     });
// }

const fetchMethod = function (url, method, body, responseType = 'json') {
    if (method == 'get' && body) { url = absoluteUrl(url, body); }

    console.log('FETCH-START- ' + url);

    var fetchPromise = vanillaFetch ?
        window.fetch(url, Object.assign({}, { method: method || 'post', headers }, method !== 'get' ? { body: JSON.stringify(body) } : { }) )
        .then(fetchAuthenticationReject)
        .then(response => response && response[responseType] && response[responseType]()) :
        Reqwest({ url, method: method || 'post', headers, data: JSON.stringify(body) }).then(fetchAuthenticationReject);

    return fetchPromise.then(fetchFailreHandle).then(fetchLog.bind(null, url)).catch(error => error);
}

export const get = function (url, body) {
    return fetchMethod(url, 'get', body);
}

export const post = function (url, body) {
    return fetchMethod(url, 'post', body);
}

export const put = function (url, body) {
    return fetchMethod(url, 'put', body);
}

export const remove = function (url, body) {
    return fetchMethod(url, 'delete', body);
}
