import React from 'react';
import MiniIngredientCard from "../../shared/MiniIngredientCard";

const GroceryItemsDisplay = ({ingredientsMap: ingredientDTOList, topBarText}) => {
    return (
        <div>
            {renderTopBar(topBarText)}
            <div className={"grocery-list-cards-div"}>
                {renderIngredients(ingredientDTOList)}
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

function renderIngredients(ingredientDTOList) {
    let ingredientCards = [];
    if (ingredientDTOList !== undefined) {
        ingredientDTOList.forEach(dto => {
            if (dto.qtyToObtain !== 0) {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={dto.ingredient}
                        qtyRequired={dto.qtyToObtain}
                    />
                )
            }
        })
        return ingredientCards;
    }
    return null;
}

export default GroceryItemsDisplay;