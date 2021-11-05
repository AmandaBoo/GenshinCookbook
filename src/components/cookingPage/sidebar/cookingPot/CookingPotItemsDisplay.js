import React from 'react';
import {CraftIngredientCard} from "../../shared/CraftIngredientCard";
import {NO_INGREDIENTS_PROCESS} from "../../../../constants/constants";

export const CookingPotItemsDisplay = ({craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick})=> {
    return (
        <div className={"grocery-list-cards-div"}>
            {renderCookingPotItems(craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick)}
        </div>
    );
}

function renderCookingPotItems(craftIngredientDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick) {
    let craftIngredientCards = [];
    if (craftIngredientDTOList !== undefined && craftIngredientDTOList.length !== 0) {
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
        return craftIngredientCards;
    } else {
        return (
            <span className={'reduced-font-size'}>
                {NO_INGREDIENTS_PROCESS}
            </span>
        )
    }
}