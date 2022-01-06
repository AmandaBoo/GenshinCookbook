import React, {useState} from 'react';
import {ModalComponent} from "../../shared/ModalComponent";
import {NavBar} from "../../shared/navBar/NavBar";
import CookbookCardDisplay from "./CookbookCardDisplay";
import RecipeQtyEditPopup from "../shared/RecipeQtyEditPopup";
import * as storage from "../../../storageInterfaces/storageInterface";
import { Legend } from '../../shared/Legend';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

export const RecipesContainer = ({onCloseClick, foodRecipes}) => {
    const [selectedTab, setSelectedTab] = useState('food-tab');
    const [selectedRecipeCard, setSelectedRecipeCard] = useState(null);

    const imgSrcList = ["images/iconsDisplay/foodIcon.png"];
    const imgSrcListIds = ["food-tab"];
    return (
        <ModalComponent>
            <NavBar
                navBarIcon={"images/iconsDisplay/foodIcon.png"}
                imgSrcList={imgSrcList}
                imgSrcListIds={imgSrcListIds}
                selectedTab={selectedTab}
                onInventoryTabClick={tabId => setSelectedTab(tabId)}
                onCloseClick={() => onCloseClick()}
            />
            <Legend
                icon={<CheckCircleTwoToneIcon/>}
                meaning={": Mastered"}
            />
            <CookbookCardDisplay
                allCardData={filterCards(foodRecipes)}
                onUpdate={card => setSelectedRecipeCard(card)}
            />
            {renderQuantityEditPopup(selectedRecipeCard, setSelectedRecipeCard, foodRecipes)}
        </ModalComponent>
    );
}

function renderQuantityEditPopup(selectedRecipeCard, setSelectedRecipeCard, foodRecipes) {
    if (selectedRecipeCard != null) {
        return (
            <RecipeQtyEditPopup
                topBarText={"Configure Recipe"}
                selectedRecipeCard={selectedRecipeCard}
                onSaveClick={(recipeCard, currentProf, customQty) =>
                    onAddNewRecipeSaveClick(recipeCard, currentProf, customQty, foodRecipes, setSelectedRecipeCard)}
                onCloseClick={() => setSelectedRecipeCard(null)}
            />
        );
    }
}

function onAddNewRecipeSaveClick(recipeCard, currentProficiency, customQty, foodRecipes, setSelectedRecipeCard) {
    let numRecipesWithCard = foodRecipes.filter(recipe => recipe.hasCard).length;

    recipeCard.rank = numRecipesWithCard === 0 ? 1 : numRecipesWithCard + 1;
    recipeCard.currentProficiency = currentProficiency;
    recipeCard.want = customQty;
    if (recipeCard.want !== 0) {
        recipeCard.hasCard = true;
    }
    storage.saveFoodRecipes(foodRecipes);
    setSelectedRecipeCard(null);
}

function filterCards(foodRecipes) {
    return foodRecipes.filter(function(value) {
        return !value.hasCard;
    });
}
