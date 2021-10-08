import React from 'react';
import MiniIngredientCard from "../../shared/MiniIngredientCard";

const GroceryItemsDisplay = ({ingredientsMap, topBarText}) => {
    return (
        <div>
            {renderTopBar(topBarText)}
            <div>
                {renderIngredients(ingredientsMap)}
            </div>
        </div>
    )
};

function renderTopBar(topBarText) {
    return (
        <div>{topBarText}</div>
    );
}

function renderIngredients(ingredientsMap) {
    let ingredientCards = [];
    if (ingredientsMap !== undefined) {
        ingredientsMap.forEach((qtyRequired, recipeObj) => {
            if (qtyRequired !== 0) {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={recipeObj}
                        qtyRequired={qtyRequired}
                    />
                );
            }
        });
        return ingredientCards;
    }
    return null;
}

export default GroceryItemsDisplay;