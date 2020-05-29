import React from 'react';
import { connectViewState } from './connect';


export default connectViewState(class SenderBox extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            enterSend: true
        }
    }

    sendMessage () {
        var message = document.getElementById('J_senderEditorIpt').innerText;
        if (message) {
            this.props.sendMessage && this.props.sendMessage(message);
            document.getElementById('J_senderEditorIpt').innerText = '';
        }
    }

    triggerKeyPress (event) {
        // console.log(event.charCode)
        if (this.state.enterSend) {
            if (event.charCode == '13') { // Enter
                this.sendMessage();
            }
        }
    }

    toggleEnterAction () {
        this.state.enterSend = !this.state.enterSend;
        this.setState({ enterSend: this.state.enterSend });
    }

    render () {
        return (
            <div>
            <div className="sender-box theme-font">
                <div className="sender-editor" contentEditable="true" style={{ minHeight: '40px' }} id="J_senderEditorIpt" onKeyPress={(event) => this.triggerKeyPress(event)}>

                </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '6px' }}>
                <span className="btn view-btn" style={{float: 'left', fontSize: '12px', color: this.state.enterSend ? '#87CEFA': 'gray'}} onClick={() => this.toggleEnterAction()}>{this.state.enterSend ? '换行即发送： OPENED' : '换行即发送： CLOSED'}</span>
                <span className="btn view-btn" onClick={() => this.sendMessage()}>Send</span>
            </div>
            </div>
        )
    }
});




// export default function SenderBox (props) {

// }
