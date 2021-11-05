import React from 'react';
import CloseButton from "../../shared/buttons/CloseButton";
import SaveButton from "../../shared/buttons/SaveButton";
import {ModalComponent} from "../../shared/ModalComponent";

const DeleteConfirmationPopup = ({deleteMessage, closeClick, saveClick}) => {
    return (
        <ModalComponent>
            <div className={"delete-popup popup"}>
                {createTopBar(closeClick)}
                {createBody(deleteMessage)}
                {createSaveButton(saveClick)}
            </div>
        </ModalComponent>
    );
}

function createTopBar(closeClick) {
    return (
        <div className={"top-bar"}>
            <CloseButton
                onCloseClick={() => {
                    closeClick();
                }}
            />
        </div>
    );
}

function createBody(deleteMessage) {
    return (
        <p>Are you sure you want to delete this {deleteMessage}?</p>
    );
}

function createSaveButton(saveClick) {
    return (
        <SaveButton
            saveText={"Confirm"}
            onSaveClick={() => saveClick()}
        />
    );
}

export default DeleteConfirmationPopup;