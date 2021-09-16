import React from 'react';

export function Icon(props) {    
    return (
        <button
            className={"btn"}
            onClick={() => props.onClick(props.id)} 
        >
        {props.text}
        </button>
    )  
}