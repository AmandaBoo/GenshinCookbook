import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({allRecipes, removeRecipeCard}) => {
    return (
        <div className={"recipe-card-display"}>
            {renderCards(allRecipes, removeRecipeCard)}
        </div>
    );
}

function renderCards(allRecipes, removeRecipeCard) {
    let cardList = [];
    if (allRecipes !== undefined) {
        allRecipes.forEach(data => {
            // TODO : FIX UNIQUE KEY PROP WARNING
            cardList.push(
                <RecipeCard
                    recipeData={data}
                    onCardDelete={card => removeRecipeCard(card)}
                />
            );
        });
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;