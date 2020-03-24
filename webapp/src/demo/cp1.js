import { ADD_ACTION } from './action'

import React from 'react';

import { connect } from 'react-redux';

class SUBComponent extends React.Component {
    constructor (props) {
        super(props);

        console.log(props);
    }



    render () {
        return (<div>
            <span onClick={ () => this.props.addOperation && this.props.addOperation() }>CCCCCC</span>
            SUB   { this.props.count }
        </div>)
    }
}

function injectState (store) {
    return { count: store.special.count };
}

function injectAction (dispatch) {
    return {
        addOperation: () => dispatch({ type: 'ADD' })
    };
}

let wrapperFunction = connect(injectState, injectAction);

// export default wrapperFunction;


export default wrapperFunction(SUBComponent);
