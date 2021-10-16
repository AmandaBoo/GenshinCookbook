import React from 'react';
import CloseButton from "./CloseButton";
import SaveButton from "./SaveButton";
import Button from "./Button";

export const UnsavedChangesPopup = ({onYesClick, onNoClick, onCloseClick}) => {
    return (
        <div className={"message-modal"}>
            <div className={"edit-popup"}>
                {createTopBar(onCloseClick)}
                {createBody()}
                {createSaveCancelButtons(onYesClick, onNoClick)}
            </div>
        </div>
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
                onClick={() => {onYesClick()}}
                text={"Yes"}
            />
            <Button
                onClick={() => onNoClick()}
                text={"No"}
            />
        </div>
    );
}