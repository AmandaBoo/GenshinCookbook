import React from 'react';
import GroceryItemsDisplay from "./GroceryItemsDisplay";

const GroceryDisplay = ({rawIngredientsMap, craftedIngredientsMap})=> {

    return (
        <div className={"sidebar-card-display"}>
            <GroceryItemsDisplay
                topBarText={"FORAGE"}
                ingredientsMap={filterIngredients(rawIngredientsMap, craftedIngredientsMap, "forage")}
            />
            <GroceryItemsDisplay
                topBarText={"SHOP"}
                ingredientsMap={filterIngredients(rawIngredientsMap, craftedIngredientsMap, "shop")}
            />
            <GroceryItemsDisplay
                topBarText={"BOTH"}
                ingredientsMap={filterIngredients(rawIngredientsMap, craftedIngredientsMap, "both")}
            />
        </div>
    )
};

function filterIngredients(rawIngredientsMap, craftedIngredientsMap, obtainedBy) {
    let filteredIngredientsMap = new Map();

    rawIngredientsMap.forEach((qty, ingredient) => {
        if (ingredient.obtainedBy === obtainedBy) {
            filteredIngredientsMap.set(ingredient, qty);
        }
    });

    craftedIngredientsMap.forEach((qty, ingredient) => {
        if (ingredient.obtainedBy === obtainedBy) {
            filteredIngredientsMap.set(ingredient, qty);
        }
    });

    return filteredIngredientsMap;
}

export default GroceryDisplay;

