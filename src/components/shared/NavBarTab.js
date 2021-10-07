import React from 'react';

export function NavBarTab ({id, src, name, isSelected, onClick}){
    if (src !== undefined) {
       return (
            <img
                className={
                    `modal-nav-bar-icon
                    ${isSelected ? "modal-nav-bar-tab-selected" : "modal-nav-bar-tab-default"}`
                }
                id={id}
                src={src}
                alt={src}
                onClick={() => onClick(id)}
            />
        );
    } else if (name !== undefined) {
        return (
            <span
                className={
                    `nav-bar-links
                    ${isSelected ? "nav-bar-link-selected" : "nav-bar-link-default"}`
                }
                id={id}
                onClick={() => onClick(id)}
            >
                {name}
            </span>
       );
    }
}
