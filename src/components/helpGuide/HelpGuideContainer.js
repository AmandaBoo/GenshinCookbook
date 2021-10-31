import React from 'react';
import CloseButton from "../shared/CloseButton";

export const HelpGuideContainer = ({pageName, onCloseClick}) => {

    // help guide will have a dropdown style of navbars on the left side
    // and then a series of changing cards on the right

    return (
        <div className={"modal"}>
            {createTopBar(onCloseClick)}
        </div>
    )
};

function createTopBar(onCloseClick) {
    return (
        <div className={"top-bar"}>
            <CloseButton
                onCloseClick={() => onCloseClick()}
            />
        </div>
    )
}