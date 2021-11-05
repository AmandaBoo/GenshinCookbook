import React from 'react';
import CloseButton from "../buttons/CloseButton";
import {ModalComponent} from "../ModalComponent";
import {KofiIcon} from "./KofiIcon";
import {PatreonIcon} from "./PatreonIcon";

export const DonatePopup = ({onCloseClick}) => {
    return (
        <ModalComponent>
            <div className={"donate-popup popup"}>
                {renderTopBar(onCloseClick)}
                {renderSubTitle()}
                <div>
                    <KofiIcon/>
                    <PatreonIcon/>
                </div>
            </div>
        </ModalComponent>
    )
}

function renderTopBar(onCloseClick) {
    return (
        <div className={"top-bar"}>
            <div>
                <span>
                    DONATE?
                </span>
                <CloseButton
                    onCloseClick={() => onCloseClick()}
                >
                </CloseButton>
            </div>
        </div>
    );
}

function renderSubTitle() {
    return (
        <div className={"sub-title"}>
            <span>
                This site was made by 1 broke college student XD <br/>
                Donations are totally optional, but greatly appreciated~
            </span>
        </div>
    );
}
