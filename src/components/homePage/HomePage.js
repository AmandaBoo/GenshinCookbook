import React from 'react';
import {WELCOME, WELCOME_MESSAGE} from "../../constants/constants";
import {NavLink} from "react-router-dom";

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
        <div className={'offside-font xlarge-font welcome-banner padding-left padding-right'}>
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
            <p className={'offside-font'}>&#x2728; {"Explore new recipes added in 2.2"} &#x2728;</p>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipe/berryMizuManjuu.png')}
                {createCookingPageItem('./images/foodRecipe/radishAndFishStew.png')}
                {createCookingPageItem('./images/foodRecipe/wakatakeni.png')}
                {createCookingPageItem('./images/foodRecipe/sobaNoodles.png')}
            </div>
        </div>
    )
}

function createCookingPageItem(imageSrc) {
    return (
        <NavLink to={'/cooking'}>
            <img
                src={imageSrc}
                alt={'newrecipe'}
                className={'home-page-img'}
            />
        </NavLink>
    )
}