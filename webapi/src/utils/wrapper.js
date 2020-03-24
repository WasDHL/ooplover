
const NormalStatus = { code: 'S200', message: 'SUCCESS' };

export let bodyWrapper = function (error, data) {
    let status = error ? { code: error.code || 'E300', message: error.message } : { code: NormalStatus.code, message: NormalStatus.message };
    return { data, status };
}

export function objWrap (str) {
    return str ? (typeof str == 'string' ? JSON.parse(str) : str) : null;
}
export function stringWrap (obj) {
    return obj ? (typeof obj == 'string' ? obj : JSON.stringify(obj)) : '';
}