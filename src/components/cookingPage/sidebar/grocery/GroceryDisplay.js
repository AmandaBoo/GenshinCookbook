import React from 'react';
import GroceryItemsDisplay from "./GroceryItemsDisplay";

const GroceryDisplay = ({rawIngredientsMap, craftedIngredientsMap})=> {

    return (
        <div className={"sidebar-card-display"}>
            {/*forage only*/}
            <GroceryItemsDisplay
                ingredientsMap={getForageOnlyIngredients(rawIngredientsMap, craftedIngredientsMap)}
            />
            {/*shop only*/}
            {/*<GroceryItemsDisplay*/}
            {/*    ingredients={getShopOnlyIngredients(rawIngredientsMap, craftedIngredientsMap)}*/}
            {/*/>*/}
            {/*/!*forage + shop*!/*/}
            {/*<GroceryItemsDisplay*/}
            {/*    ingredients={getForageAndShopIngredients(rawIngredientsMap, craftedIngredientsMap)}*/}
            {/*/>*/}
        </div>
    )
};

function getForageOnlyIngredients(rawIngredientsMap, craftedIngredientsMap) {
    // look for forage + both tag
    return rawIngredientsMap;
}

function getShopOnlyIngredients(rawIngredientsMap, craftedIngredientsMap) {
    // look for shop + both tag
}

function getForageAndShopIngredients(rawIngredientsMap, craftedIngredientsMap) {
    // look for both tag
}

export default GroceryDisplay;

