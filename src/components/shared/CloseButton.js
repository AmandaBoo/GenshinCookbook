import React from 'react';

const CloseButton = ({onCloseClick}) => {
    return (
        <span
            id={"inventory-close-btn"}
            className={"close"}
            onClick={() => onCloseClick()}
        >&times;
        </span>
    )
}
export default CloseButton