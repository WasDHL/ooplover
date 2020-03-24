import React, { Component } from 'react';

export const Modal = function (props) {
    return (
        <div className={props.active ? 'modal-overlay active' : 'modal-overlay'}>
            <div className="modal">
                { props && props.children }
            </div>
        </div>
    );
}

export const SideModal = function (props) {

}
