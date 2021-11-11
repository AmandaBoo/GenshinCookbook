import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick}) => {
    return (
        <div>
            <div className={"recipe-card-display flex-center"}>
                {renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick)}
            </div>
        </div>
    );
}

function renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard, onCardCook, onMiniIngredientEditSaveClick) {
    let cardList = [];
    if (allRecipes !== undefined) {
        allRecipes.forEach(data => {
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