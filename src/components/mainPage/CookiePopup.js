import React from 'react';
import {ModalComponent} from "../shared/ModalComponent";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const CookiePopup = ({onCloseClick}) => {
    return (
        <ModalComponent>
            {renderTopBar(onCloseClick)}
        </ModalComponent>
    );
}

function renderTopBar(onCloseClick) {
    return (
        <div className={'padding top-bar'}>
            <CloseRoundedIcon
                fontSize={'large'}
                className={'close'}
                onClick={() => onCloseClick()}
            />
        </div>
    );
}