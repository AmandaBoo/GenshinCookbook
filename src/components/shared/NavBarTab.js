import React from 'react';

export function NavBarTab ({id, src, name, isSelected, onClick}){
    if (src !== undefined) {
       return (
            <img
                className={
                    `inventory-nav-bar-tab-icon 
                    ${isSelected ? "selected-tab" : ""}`
                }
                id={id}
                src={src}
                alt={src}
                onClick={() => onClick(id)}
            />
        );
    } else if (name !== undefined) {
        return (
            <label
                className={"site-nav-bar-links"}
                id={id}
                onClick={() => onClick(id)}
            >
                {name}
            </label>
       );
    }
}
