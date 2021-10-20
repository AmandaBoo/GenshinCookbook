import React from 'react';

export const KofiIcon = ({onClick}) => {
    return (
        <div
            className={"kofi-icon-div"}
            onClick={() => onClick()}
        >
            <img
                className={'kofi-icon'}
                src={'/images/icons/barbaraBlush.png'}
                alt={'raidenSakura'}
            />
            <div className={"kofi-text-div"}>
                <span className={"kofi-text"}>Donate<br/> {"<3"}</span>
            </div>
        </div>
    );
}