import React from 'react';

export const PlaceholderPage = ({imgPath, addButtonText, onAddButtonClick, onHelpGuideButtonClick}) => {

    return (
        <div className={"flex-center help-container"}>
            <div className={"vertical-center"}>
                {createPlaceholderCharacterImage(imgPath)}
                <div>
                    {createMessageBody(onAddButtonClick, addButtonText, onHelpGuideButtonClick)}
                </div>
            </div>
        </div>
    );
}

function createPlaceholderCharacterImage(imgPath) {
    return (
        <div className={"flex-center"}>
            <img
                className={"tutorial-character"}
                src={imgPath}
                alt={"welcome image"}
            />
        </div>
    );
}

function createMessageBody(onAddButtonClick, addButtonText, onHelpGuideButtonClick) {
    return (
        <div>
            <div className={'text-align-center'}>
                Welcome to the Cooking Page! It doesn't look like you're tracking any recipes...
            </div>
            {createAddActionBody(onAddButtonClick, addButtonText)}
            {/*{createHelpGuideActionBody(onHelpGuideButtonClick)}*/}
        </div>
    );
}

function createAddActionBody(onAddButtonClick, addButtonText) {
    return (
        <div className={"help-text-container"}>
            <span>
                Click on
            </span>
            <button
                className={"modal-button"}
                onClick={() => onAddButtonClick()}
            >
                {addButtonText}
            </button>
            <span>
                to get started
            </span>
        </div>
    )
}

function createHelpGuideActionBody(onHelpGuideButtonClick) {
    return (
        <div className={"help-text-container"}>
            <span>
                Otherwise, click on
            </span>
            <button
                className={"modal-button"}
                onClick={() => onHelpGuideButtonClick()}
            >
                Help Guide
            </button>
            <span>
                if you need further assistance
            </span>
        </div>
    );
}