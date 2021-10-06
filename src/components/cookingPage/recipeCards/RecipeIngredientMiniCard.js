import React from 'react';

const RecipeIngredientMiniCard = ({ingredientData}) => {
    // TODO : ADD EDIT FUNCTIONALITY FOR EACH MINI CARD HERE
    return (
        <div>
            <img
                className={"recipe-ingredient-card"}
                src={ingredientData.ingredient.src}
                alt={ingredientData.ingredient.name}
            />
        </div>
    )
}

export default RecipeIngredientMiniCard;