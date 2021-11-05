import React from 'react';
import CloseButton from "./CloseButton";
import SaveButton from "./SaveButton";
import Button from "./Button";
import {ModalComponent} from "./ModalComponent";

export const UnsavedChangesPopup = ({onYesClick, onNoClick, onCloseClick}) => {
    return (
        <ModalComponent>
            <div className={"edit-popup popup"}>
                {createTopBar(onCloseClick)}
                {createBody()}
                {createSaveCancelButtons(onYesClick, onNoClick)}
            </div>
        </ModalComponent>
    );
}

function createTopBar(onCloseClick) {
    return (
        <div className={"top-bar"}>
            <span>Warning</span>
            <CloseButton
                onCloseClick={() => onCloseClick()}
            />
        </div>
    );
}

function createBody() {
    return (
        <div className={"message-modal-body"}>
            You have unsaved changes
            <br/>
            Would you like to save before closing?
        </div>
    );
}

function createSaveCancelButtons(onYesClick, onNoClick) {
    return (
        <div className={"save-cancel-buttons"}>
            <Button
                onClick={() => onNoClick()}
                text={"No"}
            />
            <Button
                onClick={() => {onYesClick()}}
                text={"Yes"}
            />
        </div>
    );
}