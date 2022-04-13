import React from 'react';
import {WELCOME, WELCOME_MESSAGE} from "../../constants/constants";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

export const HomePage = () => {
    return (
        <div className={'text-align-center flex-center vertical-center home-page-container'}>
            {createWelcomeBanner()}
            {createMessageBody()}
            {createCards()}
        </div>
    );
}

function createWelcomeBanner() {
    return (
        <div className={'offside-font xlarge-font welcome-banner padding-left padding-right padding-top'}>
            {WELCOME}
        </div>
    )
}

function createMessageBody() {
    return (
        <div className={'offside-font large-font message-body padding-left padding-right'}>
            {WELCOME_MESSAGE}
        </div>
    )
}

function createCards() {
    return (
        <div>
            <div className={'flex-center'}>
                <img
                    className={'sparkling-icon'}
                    src={'./images/iconsDisplay/sparkling.png'}
                    alt={'sparkling icon'}
                />
                <div className={'offside-font vertical-center'}>{"Explore new dishes added in 2.6"}</div>
                <img
                    className={'sparkling-icon'}
                    src={'./images/iconsDisplay/sparkling.png'}
                    alt={'sparkling icon'}
                />
            </div>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipeOriginal/katsuSandwich.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/rainbowAster.png')}
            </div>
        </div>
    )
}

function createCookingPageItem(imageSrc) {
    return (
        <NavLink to={'/cooking'}>
            <IconButton>
                <img
                    src={imageSrc}
                    alt={'newrecipe'}
                    className={'home-page-img'}
                />
            </IconButton>
        </NavLink>
    )
}