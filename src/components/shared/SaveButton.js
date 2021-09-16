import React from 'react';

// TODO : FIX THE STYLING... NOT SURE IF FLEX CONTAINER IS RIGHT
const SaveButton = ({onSaveClick}) => {
    return (
        <div className="flex-center-container">
            <button
                id={"save-btn"}
                className={"btn"}
                onClick={onSaveClick}
            >
                Save and Close all Tabs
            </button>
        </div>
    )
}

export default SaveButton;