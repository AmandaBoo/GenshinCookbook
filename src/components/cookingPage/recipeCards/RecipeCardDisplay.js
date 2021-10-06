import React from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({recipeData}) => {
    return (
        <div className={"recipe-card-display"}>
            {renderCards(recipeData)}
        </div>
    );
}

function renderCards(recipeData) {
    let cardList = [];
    if (recipeData !== undefined) {
        recipeData.forEach(data => {
                // TODO : FIX UNIQUE KEY PROP WARNING
                cardList.push(
                    <RecipeCard
                        recipeData={data}
                    />
                );
            }
        );
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;