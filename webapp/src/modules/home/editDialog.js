import React, { Component } from 'react';

import { Modal } from './../../widgets/modal';
import Editor from './../../widgets/editor';
import { connectViewState } from './connect';
import { connectAsyncState } from './../common/connect';


class EditForm extends Component {
    constructor (props) {
        super(props);

        var diary = props.currentEditDiary || {};
        var id = props.editDiaryId;
        this.state = {
            title: diary || '',
            premission: diary.authId ? 'private' : 'public',
            content: diary.content
        };
    }

    componentWillReceiveProps() {

    }

    render () {
        return (
            <div>
                <div className="edit-dialog-content">
                    <div className="form-cp-wrap">
                        <div>Title: </div>
                        <span className="form-value v-m">
                            <input className="form-ipt" type="text" value={this.state.title} style={{width: "300px", fontSize: "14px"}} onChange={event => { this.state.title = event.target.value; this.setState({ title: this.state.title }); }} />
                        </span>
                    </div>
                    <div className="form-cp-wrap">
                        <div>Content: </div>
                        <Editor content={this.content} onChange={content => (this.content = content)} />
                    </div>
                    <div>
                        <span onClick={() => this.setState({ premission: 'private' })}><input type="radio" name="premission" value="private" className="v-m" checked={this.state.premission==='private'} /> <span className="v-m">Private</span></span>
                        <span onClick={() => this.setState({ premission: 'public' })}><input type="radio" name="premission" value="public" className="v-m" checked={this.state.premission==='public'} style={{marginLeft: '20px'}} /> <span className="v-m">Public</span></span>
                    </div>
                </div>
                <div className="edit-dialog-footer" style={{paddingTop: "10px", textAlign: "right"}}>
                    <div>
                        <span className="btn" onClick={() => !btnDisabled && this.submit()} style={{color: "#98C05C"}}>sUbmit</span>
                        <span className="btn" onClick={() => !btnDisabled && props.toggleEditDialog && props.toggleEditDialog(props.editDiaryId)} style={{color: "#D3D3D3"}}>cAncel</span>
                    </div>
                </div>
            </div>
        );
    }
}






function EditDialog (props) {
    return props && props.editDiaryId && (
        <Modal active={true} key={props.editDiaryId}>
            <div className="edit-dialog-wrap">
                <div className="edit-dialog-header" style={{position: "relative"}}>
                    <div className="edit-dialog-title">{this.currentEditDiary.id ? 'Edit Diary' : 'Create New Diary'}</div>
                    <div className="opera-container" style={{display: "block"}}>
                        <span className="btn close-btn" onClick={() => !btnDisabled && this.props.toggleEditDialog && this.props.toggleEditDialog(this.props.editDiaryId)} style={{color: "#F08080"}}>cLose</span>
                    </div>
                </div>
                <EditForm />
            </div>
        </Modal>
    )
}






class EditDialogBak extends Component {
    constructor (props) {
        super(props);

        this.props = props;

        this.currentEditDiary = this.props.currentEditDiary || {};
        this.state = {
            title: this.currentEditDiary.title,
            premission: this.currentEditDiary.authId ? 'private' : 'public'
        };
        this.content = this.currentEditDiary.content;
    }
    // (event) => props.updateEditDiary && props.updateEditDiary({ title: event.target.value })
    // content => props.updateEditDiary && props.updateEditDiary({ content: content })

    componentWillReceiveProps (newProps) {
        console.log('RECEIVE NEW');
        console.log(newProps);
        // if (newProps.editDiaryId && (newProps.editDiaryId !== this.props.editDiaryId)) {
            // console.log('RECEIVE NEW');
            this.currentEditDiary = newProps.currentEditDiary || {};
            this.state.title = this.currentEditDiary.title;
            this.content = this.currentEditDiary.content;
        // }
    }

    submit () {
        let editDiary = { title: this.state.title, content: this.content, premission: this.state.premission == 'private' };
        this.props.currentEditDiary.id && (editDiary.id = this.props.currentEditDiary.id);
        this.props.submit && this.props.submit(editDiary);
    }

    render () {
        var props = this.props;
        var btnDisabled = !!this.props.isSubmittingDiary;
        var isFetchingDiaryDetail = this.props.isFetchingDiaryDetail;
        console.log(this.props)
        var currentEditId = this.props.currentEditDiary && this.props.currentEditDiary.id;
        // var dialogHide = !this.props.editDiaryId || !this.props.currentEditDiary;
        var dialogHide = !currentEditId || isFetchingDiaryDetail;

        return !isFetchingDiaryDetail && !dialogHide && (
            <Modal active={!dialogHide} key={props.currentEditDiary}>
                <div className="edit-dialog-wrap">
                    <div className="edit-dialog-header" style={{position: "relative"}}>
                        <div className="edit-dialog-title">{this.currentEditDiary.id ? 'Edit Diary' : 'Create New Diary'}</div>
                        <div className="opera-container" style={{display: "block"}}>
                            <span className="btn close-btn" onClick={() => !btnDisabled && this.props.toggleEditDialog && this.props.toggleEditDialog(this.props.editDiaryId)} style={{color: "#F08080"}}>cLose</span>
                        </div>
                    </div>
                    <div className="edit-dialog-content">
                        <div className="form-cp-wrap">
                            <div>Title: </div>
                            <span className="form-value v-m">
                                <input className="form-ipt" type="text" value={this.state.title} style={{width: "300px", fontSize: "14px"}} onChange={event => { this.state.title = event.target.value; this.setState({ title: this.state.title }); }} />
                            </span>
                        </div>
                        <div className="form-cp-wrap">
                            <div>Content: </div>
                            <Editor content={this.content} onChange={content => (this.content = content)} />
                        </div>
                        <div>
                            <span onClick={() => this.setState({ premission: 'private' })}><input type="radio" name="premission" value="private" className="v-m" checked={this.state.premission==='private'} /> <span className="v-m">Private</span></span>
                            <span onClick={() => this.setState({ premission: 'public' })}><input type="radio" name="premission" value="public" className="v-m" checked={this.state.premission==='public'} style={{marginLeft: '20px'}} /> <span className="v-m">Public</span></span>
                        </div>
                    </div>
                    <div className="edit-dialog-footer" style={{paddingTop: "10px", textAlign: "right"}}>
                        <div>
                            <span className="btn" onClick={() => !btnDisabled && this.submit()} style={{color: "#98C05C"}}>sUbmit</span>
                            <span className="btn" onClick={() => !btnDisabled && props.toggleEditDialog && props.toggleEditDialog(props.editDiaryId)} style={{color: "#D3D3D3"}}>cAncel</span>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

// "segmentId":"SG10266",
//     "segmentName":"活跃人群",
//     "packageId":"10112",
//     "packageName":"活跃人群",
// "count":156148


export default connectAsyncState(connectViewState(EditDialog));
