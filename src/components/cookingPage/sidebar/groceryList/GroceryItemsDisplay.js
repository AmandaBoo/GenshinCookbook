import React from 'react';
import MiniIngredientCard from "../../shared/MiniIngredientCard";

const GroceryItemsDisplay = ({ingredientDTOList, topBarText, onMiniIngredientEditSaveClick, isEnabled = true,
                                 showCompletedIng}) => {
    return (
        <div>
            {renderTopBar(topBarText)}
            <div className={"grocery-list-cards-div"}>
                {renderIngredients(ingredientDTOList, onMiniIngredientEditSaveClick, isEnabled, showCompletedIng)}
            </div>
        </div>
    )
};

function renderTopBar(topBarText) {
    return (
        <div className={"header-text grocery-list-top-bar"}>
            {topBarText}
        </div>
    );
}

function renderIngredients(ingredientDTOList, onMiniIngredientEditSaveClick, isEnabled, doShowCompletedIng) {
    let ingredientCards = [];
    if (ingredientDTOList !== undefined) {
        ingredientDTOList.forEach(dto => {
            if (doShowCompletedIng || (dto.qtyToObtain > 0  && !doShowCompletedIng)) {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={dto.ingredient}
                        qtyRequired={dto.qtyToObtain}
                        onEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                        isEnabled={isEnabled}
                    />
                );
            }
        })
        return ingredientCards;
    }
    return null;
}

export default GroceryItemsDisplay;