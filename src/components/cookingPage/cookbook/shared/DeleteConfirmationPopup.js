import React from 'react';
import CloseButton from "../../../shared/CloseButton";
import SaveButton from "../../../shared/SaveButton";

const DeleteConfirmationPopup = ({deleteMessage, closeClick, saveClick}) => {
    return (
        <div className={"message-modal"}>
            <div className={"delete-popup"}>
                <div className={"top-bar"}>
                    <CloseButton
                        onCloseClick={() => {
                            closeClick();
                        }}
                    />
                </div>
                <p>Are you sure you want to delete this {deleteMessage}?</p>
                <SaveButton
                    saveText={"Confirm"}
                    onSaveClick={() => saveClick()}
                />
            </div>
        </div>
    )
}

export default DeleteConfirmationPopup;