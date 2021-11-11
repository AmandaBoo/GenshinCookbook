import React from 'react';

export const DonateIcon = ({onClick}) => {
    return (
        <div
            className={"kofi-icon-div"}
            onClick={() => onClick()}
        >
            <img
                className={'kofi-icon'}
                src={'/images/icons/barbaraBlush.png'}
                alt={'barbaraBlush'}
            />
            <div className={"vertical-center"}>
                <span className={"kofi-text"}>Donate<br/> {"<3"}</span>
            </div>
        </div>
    );
}