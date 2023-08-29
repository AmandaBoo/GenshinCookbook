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
                <div className={'offside-font vertical-center'}>{"Explore new dishes added in 4.0"}</div>
                <img
                    className={'sparkling-icon'}
                    src={'./images/iconsDisplay/sparkling.png'}
                    alt={'sparkling icon'}
                />
            </div>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipeOriginal/duckConfit.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/creamofMushroomSoup.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/fontaineAspic.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/lasagna.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/poissonSeafoodSoup.png')}
            </div>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipeOriginal/fontainianFoieGras.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/garlicBaguette.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/fontainianOnionSoup.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/fishandChips.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/patedeFruit.png')}
            </div>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipeOriginal/ileflottante.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/conchMadeleine.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/tassesRagout.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/poissonchantPie.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/steakTartare.png')}
            </div>
            <div className={'image-container'}>
                {createCookingPageItem('./images/foodRecipeOriginal/fruityTrio.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/vessieChicken.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/fruitySmoothie.png')}
                {createCookingPageItem('./images/foodRecipeOriginal/fruityDuet.png')}
            </div>
        </div>
    )
}

function createCookingPageItem(imageSrc) {
    return (
        <NavLink to={'/cooking'}>
            <IconButton size={'small'}>
                <img
                    src={imageSrc}
                    alt={'newrecipe'}
                    className={'home-page-img'}
                />
            </IconButton>
        </NavLink>
    )
}