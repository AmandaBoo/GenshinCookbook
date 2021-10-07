import React from 'react';

export function Icon({onClick, id, text}) {
    return (
        <button
            className={"modal-button"}
            onClick={() => onClick(id)}
        >
        {text}
        </button>
    )  
}