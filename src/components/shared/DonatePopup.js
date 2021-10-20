import React from 'react';
import CloseButton from "./CloseButton";

export const DonatePopup = ({onCloseClick}) => {
    return (
        <div className={"message-modal donate-modal"}>
            <div className={"donate-popup"}>
                {renderTopBar(onCloseClick)}
                {renderSubTitle()}
                <div>
                    {renderKofiLink()}
                    {renderPatreonLink()}
                </div>
            </div>
        </div>
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

function renderKofiLink() {
    return (
        <div className={"donate-icon-div"}>
            <a href={"https://ko-fi.com/kitbon" } target="_blank">
                <img
                    src={"./images/icons/kofiIcon.png"}
                    alt={"Kofi Icon"}
                    className={"kofi-icon"}
                />
            </a>
        </div>
    );
}

function renderPatreonLink() {
    return (
        <div className={"donate-icon-div"}>
            <a href={"https://www.patreon.com/"} target={"_blank"}>
                <img
                    src={"./images/icons/patreonIcon.png"}
                    alt={"Patreon Icon"}
                    className={"patreon-icon"}
                />
            </a>
        </div>
    );
}
