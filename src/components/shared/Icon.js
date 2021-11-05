import React from 'react';

export function Icon({onClick, text}) {
    return (
        <button
            className={"modal-button"}
            onClick={() => onClick()}
        >
        {text}
        </button>
    )  
}