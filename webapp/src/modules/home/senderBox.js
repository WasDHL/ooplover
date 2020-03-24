import React from 'react';
import { connectViewState } from './connect';


export default connectViewState(class SenderBox extends React.Component {
    constructor (props) {
        super(props);
    }

    sendMessage () {
        var message = document.getElementById('J_senderEditorIpt').innerText;
        if (message) {
            this.props.sendMessage && this.props.sendMessage(message);
            document.getElementById('J_senderEditorIpt').innerText = '';
        }
    }

    render () {
        return (
            <div>
            <div className="sender-box">
                <div className="sender-editor" contentEditable="true" style={{ minHeight: '40px' }} id="J_senderEditorIpt">
    
                </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '6px' }}>
                <span className="btn view-btn" onClick={() => this.sendMessage()}>Send</span>
            </div>
            </div>
        )
    }
});




// export default function SenderBox (props) {
    
// }