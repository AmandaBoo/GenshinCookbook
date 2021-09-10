import React from 'react';

const CloseButton = (props) => {
    return (
        <span
            id={"inventory-close-btn"}
            className={"close"}
            onClick={() => props.onClick()}
        >&times;
        </span>
    )
}
export default CloseButton