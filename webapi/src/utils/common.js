
export const ArrToMap = function (arr, objKey, objValueKey) {
    var mapData = {};
    arr && arr.map(data => ( mapData[ objKey ? data[objKey] : data ] = objValueKey ? data[objValueKey] : data ));
    return mapData;
}


export const CrossJoinArr = function (leftArr, rightArr, objKey) {
    var leftMap = ArrToMap(leftArr, objKey), rightMap = ArrToMap(rightArr, objKey);

    var result = { left: [], cross: [], right: [] };
    result.left = leftArr.filter(item => !rightMap[objKey ? item[objKey] : item]);
    result.cross = leftArr.filter(item => rightMap[objKey ? item[objKey] : item]);
    result.right = rightArr.filter(item => !leftMap[objKey ? item[objKey] : item]);
    return result;
}

export const RightJoinArr = function (leftArr, rightArr, objKey) {
    var crossResult = CrossJoinArr(leftArr, rightArr, objKey);

    return { result: crossResult.cross.concat(crossResult.right), rest: crossResult.left };
}