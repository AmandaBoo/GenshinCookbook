import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({allRecipes, removeRecipeCard, editRecipeCard}) => {
    return (
        <div className={"recipe-card-display"}>
            {renderCards(allRecipes, removeRecipeCard, editRecipeCard)}
        </div>
    );
}

function renderCards(allRecipes, removeRecipeCard, editRecipeCard) {
    let cardList = [];
    if (allRecipes !== undefined) {
        allRecipes.forEach(data => {
            // TODO : FIX UNIQUE KEY PROP WARNING
            cardList.push(
                <RecipeCard
                    recipeData={data}
                    onCardDelete={card => removeRecipeCard(card)}
                    onCardEdit={(card, curProf, customQty) => editRecipeCard(card, curProf, customQty)}
                />
            );
        });
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;