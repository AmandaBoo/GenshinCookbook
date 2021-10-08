import React from 'react';

// TODO : FIX THE STYLING... NOT SURE IF FLEX CONTAINER IS RIGHT
const SaveButton = ({saveText = "Save", onSaveClick}) => {
    return (
        <div className="flex-center-container">
            <button
                id={"save-btn"}
                className={"modal-button"}
                onClick={onSaveClick}
            >
                {saveText}
            </button>
        </div>
    )
}

export default SaveButton;