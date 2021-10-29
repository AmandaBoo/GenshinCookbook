import React, {useState} from 'react';
import {CookingPotCookingPopup} from "../sidebar/cookingPot/CookingPotCookingPopup";

export const CraftIngredientCard = ({ingredientDTO, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick})=> {
    const [isCookClicked, setCookClicked] = useState(false);
    return (
        <>
            <div className={"cooking-pot-ingredient-container"}>
                {renderMiniIngredientCard(ingredientDTO)}
                {renderCookButton(setCookClicked)}
            </div>
            {renderCraftCookPopup(ingredientDTO, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick, isCookClicked, setCookClicked)}
        </>
    );
}

function renderMiniIngredientCard(ingredientDTO) {
    return (
        <img
            className={"cooking-pot-ingredient-img"}
            src={ingredientDTO.ingredient.src}
            alt={ingredientDTO.ingredient.name}
            style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientDTO.ingredient.rarity + '_background_cropped.jpg")'}}
        />
    );
}

function renderCookButton(setCookClicked) {
    return (
        <div className={"flex-center"}>
            <button
                className={'small-button'}
                onClick={() => setCookClicked(true)}
            >
                Cook
            </button>
        </div>
    );
}

function renderCraftCookPopup(ingredientDTO, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick, isCookClicked, setCookClicked) {
    if (isCookClicked) {
        return (
            <CookingPotCookingPopup
                processedIngredient={ingredientDTO}
                onCloseClick={() => setCookClicked(false)}
                onSaveClick={(craftIngredientCooked, subIngredientsUsed) =>
                    onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
        );
    }
}
