import React, { Component } from 'react';

// export default function (initialFunction) {

// }

export default class InitialTriggerComponent extends Component {
    componentDidMount () {
        this.props && this.props.initialAction && typeof this.props.initialAction == "function" && this.props.initialAction();
    }
    render () { return null; }
}
