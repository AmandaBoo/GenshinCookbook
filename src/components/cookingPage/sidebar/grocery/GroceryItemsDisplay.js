import React from 'react';
import MiniIngredientCard from "../../shared/MiniIngredientCard";

const GroceryItemsDisplay = ({ingredientsMap: ingredientDTOList, topBarText, onMiniIngredientEditSaveClick}) => {
    return (
        <div>
            {renderTopBar(topBarText)}
            <div className={"grocery-list-cards-div"}>
                {renderIngredients(ingredientDTOList, onMiniIngredientEditSaveClick)}
            </div>
        </div>
    )
};

function renderTopBar(topBarText) {
    return (
        <div className={"grocery-list-top-bar"}>
            {topBarText}
        </div>
    );
}

function renderIngredients(ingredientDTOList, onMiniIngredientEditSaveClick) {
    let ingredientCards = [];
    if (ingredientDTOList !== undefined) {
        ingredientDTOList.forEach(dto => {
            if (dto.qtyToObtain !== 0) {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={dto.ingredient}
                        qtyRequired={dto.qtyToObtain}
                        onEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    />
                )
            }
        })
        return ingredientCards;
    }
    return null;
}

export default GroceryItemsDisplay;