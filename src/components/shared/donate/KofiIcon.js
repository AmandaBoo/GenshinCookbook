import React from 'react';

export const KofiIcon = () => {
    return (
        <div className={"donate-icon-div flex-center"}>
            <a href={"https://ko-fi.com/kitbon" } target="_blank">
                <img
                    src={"./images/icons/buyMeACoffeeIcon.png"}
                    alt={"Kofi Icon"}
                    className={"kofi-icon"}
                />
            </a>
        </div>
    );
}