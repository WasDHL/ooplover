import { createStore, combineReducers, applyMiddleware } from 'redux';

const InitialData = {
    count: 1
};

// export const ADD_ACTION = { type: 'ADD' };
//
// export const REOVE_ACTION = { type: 'REMOVE' };

const CommonReducer = function (status = InitialData, action) {
    switch (action.type) {
        case 'ADD':
            return Object.assign({}, status, { count: status.count + 2 });
        default:
            return status;
    }
}

const InitialData2 = {
    count: 11
};


const SpecialReducer = function (status = InitialData2, action) {
    switch (action.type) {
        case 'ADD':
            return Object.assign({}, status, { count: status.count + 2 });
        default:
            return status;
    }
}

export default createStore(combineReducers({ common: CommonReducer, special: SpecialReducer }));


// {
//     common: { count: 1 },
//
//     special: { count: 11 }
// }
