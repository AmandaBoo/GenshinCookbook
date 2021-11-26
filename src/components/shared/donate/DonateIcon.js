import React from 'react';

export const DonateIcon = ({onClick}) => {
    return (
        <div
            className={"kofi-icon-div"}
            onClick={() => onClick()}
        >
            <img
                className={'kofi-icon'}
                src={'/images/iconsDisplay/barbaraBlush.png'}
                alt={'barbaraBlush'}
            />
            <div className={"vertical-center"}>
                <span className={"kofi-text"}>Donate<br/>&#9829;</span>
            </div>
        </div>
    );
}