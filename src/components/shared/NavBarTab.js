import React from 'react';

export function NavBarTab (props){
    if (props.src !== undefined) {
       return (
            <img
                className={
                    `inventory-nav-bar-tab-icon 
                    ${props.isSelected ? "selected-tab" : ""}`
                }
                id={props.id}
                src={props.src}
                alt={props.src}
                onClick={() => props.onClick(props.id)}
            />
        );
    } else if (props.name !== undefined) {
        return (
            <label
                className={"site-nav-bar-links"}
                id={props.id}
            >
                props.name
            </label>
       );
    }
}
