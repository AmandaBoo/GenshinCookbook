import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard}) => {
    return (
        <div className={"recipe-card-display"}>
            {renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard)}
        </div>
    );
}

function renderCards(allRecipes, removeRecipeCard, editRecipeCard, enableDisableRecipeCard) {
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
                />
            );
        });
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;