import React from 'react';
import { Editor, ContentState } from 'draft-js';

import { EditorState } from 'braft-editor';

window.EditorState = EditorState;

// editorState.toRAW() = `{"blocks":[{"key":"aade3","text":"今天的豆包子表现出了对她娘亲的极大的占有欲， 妈妈抱着安安妹妹的时候， 豆包子的表情已可见的速度从愤怒变成委屈， 瘪起的小嘴， 快要决堤的眼泪， 着实让人心疼。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":23,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`;

export default class DiaryEditor extends React.Component {
    constructor (props) {
        super(props);
        let content = props.content;
        this.state = { editorState: content ? EditorState.createFrom(content) : EditorState.createEmpty() };

        this.controls = [
            { key: 'bold', text: <b>加粗</b> },
            { key: 'italic', text: <b>倾斜</b> },
            { key: 'underline', text: <b>下划线</b> }
        ];

        console.log('CONSTRUCTOR');
    }

    onChange (editorState) {
        this.state.editorState = editorState;
        // console.log(editorState);
        this.setState({ editorState: this.state.editorState });
        // debugger;
        let raw = this.state.editorState.toRAW();
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(JSON.parse(raw));
    }

    componentWillReceiveProps() {
        console.log('NEW');
    }

    render() {
        return (
            <div className="editor-wrapper">
                <Editor
                    editorState={this.state.editorState}
                    onChange={(editorState) => this.onChange(editorState)}
                />
            </div>
        );
    }
}

export const DiaryViewer = function (props) {
    var raw = props.raw || {
        "blocks":[
        ],
        "entityMap":{}
    };
    return (
        <div className="viewer-wrapper">
            <Editor
                disabled={true}
                controls={[]}
                value={ raw ? EditorState.createFrom(raw) : EditorState.createEmpty() }
                editorState={ props && props.raw ? EditorState.createFrom(props.raw) : EditorState.createEmpty() }
            />
        </div>
    );
}
