import React from 'react';
import {CraftIngredientCard} from "../../shared/CraftIngredientCard";

export const CookingPotItemsDisplay = ({craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick})=> {
    return (
        <div className={"grocery-list-cards-div"}>
            {renderCookingPotItems(craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick)}
        </div>
    );
}

function renderCookingPotItems(craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick) {
    let craftIngredientCards = [];
    if (craftIngredientDTOList !== undefined) {
        craftIngredientDTOList.forEach(dto => {
            if (dto.qtyToObtain > 0) {
                craftIngredientCards.push(
                    <CraftIngredientCard
                        ingredientDTO={dto}
                        onCraftIngredientCookSaveClick={(craftIngredientCooked, subIngredientsUsed) =>
                            onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                        onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    />
                )
            }
        });
    }
    return craftIngredientCards;
}
