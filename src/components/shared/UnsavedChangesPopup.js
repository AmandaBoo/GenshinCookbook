import React from 'react';
import CloseButton from "./buttons/CloseButton";
import SaveButton from "./buttons/SaveButton";
import Button from "./buttons/Button";
import {SubModalComponent} from "./SubModalComponent";

export const UnsavedChangesPopup = ({onYesClick, onNoClick, onCloseClick}) => {
    return (
        <SubModalComponent>
            <div className={"edit-popup popup"}>
                {createTopBar(onCloseClick)}
                {createBody()}
                {createSaveCancelButtons(onYesClick, onNoClick)}
            </div>
        </SubModalComponent>
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
        <div className={"message-modal-body text-align-center"}>
            You have unsaved changes
            <br/>
            Would you like to save before closing?
        </div>
    );
}

function createSaveCancelButtons(onYesClick, onNoClick) {
    return (
        <div className={"flex-center"}>
            <Button
                onClick={() => onNoClick()}
                text={"No"}
            />
            <span className={'padding-right'}/>
            <Button
                onClick={() => {onYesClick()}}
                text={"Yes"}
            />
        </div>
    );
}