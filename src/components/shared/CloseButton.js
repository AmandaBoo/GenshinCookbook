import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CloseButton = ({onCloseClick}) => {
    return (
        <CloseRoundedIcon
            id={"inventory-close-btn"}
            className={"close"}
            onClick={() => onCloseClick()}
        />
    )
}
export default CloseButton