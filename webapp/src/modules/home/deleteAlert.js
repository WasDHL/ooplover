import React, { Component } from 'react';

import { Modal } from './../../widgets/modal';
import { connectViewState } from './connect';
import { connectAsyncState } from './../common/connect';

export default connectAsyncState(connectViewState(props => (props.currentDeleteDiary ? (
    <Modal active={!!props.currentDeleteDiary.id} key={props.currentDeleteDiary.id}>
        <div className="v-m-container">
            <div className="v-m-element">
                <div className="delete-alert">
                    <div className="delete-content">
                        Are You Sure to <span style={{color: "#F08080"}}>DELETE</span> "{ props.currentDeleteDiary.title }" ?
                    </div>
                    <div className="delete-footer">
                        <span className="btn" onClick={() => !props.isDelettingDiary && props.delete && props.delete(props.currentDeleteDiary.id)} style={{color: "#F08080"}}>dElete</span>
                        <span className="btn" onClick={() => props.toggleDeleteAlert && props.toggleDeleteAlert(null)} style={{color: "#D3D3D3"}}>cAncel</span>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
) : null)));
