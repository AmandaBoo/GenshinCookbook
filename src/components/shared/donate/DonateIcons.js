import React from 'react';

export const DonateIcons = () => {
    return (
        <div className={"donate-icon-div flex-center"}>
            <a href={"https://ko-fi.com/kitbon" } target="_blank">
                <img
                    src={"./images/iconsDisplay/kofiRound.png"}
                    alt={"Kofi Icon"}
                    className={"donate-icon padding-right"}
                />
            </a>
            {/*<a href={"https://ko-fi.com/kitbon" } target="_blank">*/}
            {/*    <img*/}
            {/*        src={"./images/iconsDisplay/paypal.png"}*/}
            {/*        alt={"Paypal Icon"}*/}
            {/*        className={"donate-icon"}*/}
            {/*    />*/}
            {/*</a>*/}
        </div>
    );
}