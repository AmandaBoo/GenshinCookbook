import React from 'react';
import {CookingPotItemsDisplay} from "./CookingPotItemsDisplay";

export const CookingPotDisplay = ({craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick})=> {
    return (
        <div className={"sidebar-card-display"}>
            {renderTopBar()}
            {renderCookingPotItems(craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick)}
        </div>
    );
}

function renderTopBar() {
    return (
        <div className={"flex-center header-text large-font top-bar"}>COOKING POT</div>
    );
}

function renderCookingPotItems(craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick) {
    return (
        <>
            <CookingPotItemsDisplay
                craftIngredientDTOList={craftIngredientsDTOList}
                onCraftIngredientCookSaveClick={(craftIngredientCooked, subIngredientsUsed) =>
                    onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
        </>
    );
}