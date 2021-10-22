import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick}) => {
    return (
        <div className={"recipe-card-display"}>
            {renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick)}
        </div>
    );
}

function renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick) {
    let cardList = [];
    if (allRecipes !== undefined) {
        allRecipes.forEach(data => {
            // TODO : FIX UNIQUE KEY PROP WARNING
            cardList.push(
                <RecipeCard
                    recipeData={data}
                    onCardDelete={card => removeRecipeCard(card)}
                    onCardEdit={(card, curProf, customQty) => editRecipeCard(card, curProf, customQty)}
                    onCardEnableDisable={(card) => enableDisableRecipeCard(card)}
                    onCardCook={(card) => onCardCook(card)}
                    onMiniIngredientEditSaveClick={(ingredient, ingredientQty) => onMiniIngredientEditSaveClick(ingredient, ingredientQty)}
                />
            );
        });
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;