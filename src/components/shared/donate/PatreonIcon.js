import React from 'react';

export const PatreonIcon = () => {
    return (
        <div className={"donate-icon-div flex-center"}>
            <a href={"https://www.patreon.com/"} target={"_blank"}>
                <img
                    src={"./images/icons/patreonIcon.png"}
                    alt={"Patreon Icon"}
                    className={"patreon-icon"}
                />
            </a>
        </div>
    );
}