import React, { Component } from 'react';

const CreateBtn = function (props) {
    return (
        <span className="btn view-btn" onClick={() => props.toggleEditDialog && props.toggleEditDialog('CREATE_NEW', { content: {}, title: '' })}>cReate nEw</span>
    );
}

import { connectViewState } from './connect';

export default connectViewState(CreateBtn);
