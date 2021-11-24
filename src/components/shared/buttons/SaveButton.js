import React from 'react';

const SaveButton = ({saveText = "Save", onSaveClick, isDisabled = false}) => {
    return (
        <div className="flex-center">
            <button
                id={"save-btn"}
                className={`
                    ${isDisabled ? "disabled-button" : ""}
                    modal-button
                `}
                disabled={isDisabled}
                onClick={onSaveClick}
            >
                {saveText}
            </button>
        </div>
    )
}

export default SaveButton;