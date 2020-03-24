import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import SUBComponent from './cp1';

import Store from './store';

class APP extends Component {
    constructor (props) {
        super(props);
        this.props = props;

        // console.log(props);

        this.state111111 = {
            expand: props.expand,
            a: true,
            b: true
        };
    }

    clickFunc () {
        // this.state111111.expand = false;

        this.props.addOperation && this.props.addOperation();
        // this.setState({ a: newValue }, () => {
        //     this.setState({ b: fromNewA });
        // });
        // this.setState({ b: fromNewA });
    }

    componentDidMounted () {
        
    }

    render () {
        return (
            <div>
                <span onClick={ () => this.clickFunc() }>CLICK</span>
                { this.state111111.expand ? <div>aaaa { this.props.count }</div> : null }

                <SUBComponent></SUBComponent>
            </div>
        );
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


var HightAPP = connect(injectState, injectAction)(APP);

ReactDOM.render(<Provider store={Store}><HightAPP expand={true} p2="dfg"></HightAPP></Provider>, document.getElementById('root'));
