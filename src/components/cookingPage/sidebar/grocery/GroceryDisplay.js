import React from 'react';
import GroceryItemsDisplay from "./GroceryItemsDisplay";

const GroceryDisplay = ({rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick})=> {

    return (
        <div className={"sidebar-card-display"}>
            <GroceryItemsDisplay
                topBarText={"FORAGE"}
                ingredientsMap={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "forage")}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
            <GroceryItemsDisplay
                topBarText={"SHOP"}
                ingredientsMap={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "shop")}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
            <GroceryItemsDisplay
                topBarText={"SHOP + FORAGE"}
                ingredientsMap={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "both")}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
        </div>
    )
};

function filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, obtainedBy) {
    let filteredIngredientsDTOList = [];

    let filteredRawIngList = rawIngredientsDTOList.filter(dto => dto.ingredient.obtainedBy === obtainedBy);
    let filteredCraftIngList = craftedIngredientsDTOList.filter(dto => dto.ingredient.obtainedBy === obtainedBy)
    if (filteredRawIngList.length > 0) {
        filteredIngredientsDTOList = filteredIngredientsDTOList.concat(filteredRawIngList);
    }
    if (filteredCraftIngList.length > 0) {
        filteredIngredientsDTOList = filteredIngredientsDTOList.concat(filteredCraftIngList);
    }

    return filteredIngredientsDTOList;
}

export default GroceryDisplay;

