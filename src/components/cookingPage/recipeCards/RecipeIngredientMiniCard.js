import React from 'react';

const RecipeIngredientMiniCard = ({ingredientData}) => {
    // TODO : ADD EDIT FUNCTIONALITY FOR EACH MINI CARD HERE
    return (
        <div className={"recipe-ingredient-container"}>
            <img
                className={"recipe-ingredient-card mini-card"}
                src={ingredientData.ingredient.src}
                alt={ingredientData.ingredient.name}
                style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientData.ingredient.rarity + '_background_cropped.jpg")'}}
            />
            <div
                className={"ingredient-count-overlay"}
            > YAY!
            </div>
        </div>
    )
}

export default RecipeIngredientMiniCard;