import React from 'react';
import MiniIngredientCard from "../../shared/MiniIngredientCard";

const GroceryItemsDisplay = ({ingredientsMap}) => {
    return (
        <div>
            {renderIngredients(ingredientsMap)}
        </div>
    )
};

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