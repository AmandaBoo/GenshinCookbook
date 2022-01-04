import React, {useState} from 'react';
import {NavBar} from "../shared/navBar/NavBar";
import {ModalComponent} from "../shared/ModalComponent";
import {AlchemyRecipeQtyEditPopup} from "./AlchemyRecipeQtyEditPopup";
import * as storage from '../../storageInterfaces/storageInterface';

export const AlchemyRecipesContainer = ({onCloseClick, foodRecipes, navBarIconPath, imgSrcList, imgSrcListIds}) => {
    const [selectedTab, setSelectedTab] = useState('food-tab');
    const [selectedRecipeCard, setSelectedRecipeCard] = useState(null);
    return (
        <ModalComponent>
            <NavBar
                navBarIcon={navBarIconPath}
                imgSrcList={imgSrcList}
                imgSrcListIds={imgSrcListIds}
                selectedTab={selectedTab}
                onInventoryTabClick={tabId => setSelectedTab(tabId)}
                onCloseClick={() => onCloseClick()}
            />

            {renderQuantityEditPopup(selectedRecipeCard, setSelectedRecipeCard, foodRecipes, navBarIconPath)}
        </ModalComponent>
    );
}

function renderQuantityEditPopup(selectedRecipeCard, setSelectedRecipeCard, foodRecipes, navBarIconPath) {
    if (selectedRecipeCard !== null) {
        return (
            <AlchemyRecipeQtyEditPopup
                topBarText={"Configure Recipe"}
                selectedRecipeCard={selectedRecipeCard}
                onSaveClick={(recipeCard, qtyWant) =>
                    onAddNewAlchemyRecipeSaveClick(recipeCard, qtyWant, foodRecipes, setSelectedRecipeCard)}
                onCloseClick={() => setSelectedRecipeCard(null)}
            />
        )
    }
}

function onAddNewAlchemyRecipeSaveClick(recipeCard, qtyWant, recipes, setSelectedRecipeCard) {
    let numRecipesWithCard = recipes.filter(recipe => recipe.hasCard).length;

    recipeCard.rank = numRecipesWithCard === 0 ? 1 : numRecipesWithCard + 1;
    recipeCard.qtyWant = qtyWant;
    if (recipeCard.qtyWant !== 0) {
        recipeCard.hasCard = true;
    }
    storage.saveAlchemyRecipes(recipes);
    setSelectedRecipeCard(null);
}

function filterCards(foodRecipes) {
    return foodRecipes.filter(function(value) {
        return !value.hasCard;
    });
}
