import React from 'react';

export function Legend({icon,meaning}) {
    return (
        <div
            className={'modal-legend-icon'}
        >
        {icon} <div
                    className={'modal-legend-meaning'}
                >
                {meaning}
              </div>
        </div>
    )  
}