import React from 'react';
import RecipeIngredientMiniCard from "./RecipeIngredientMiniCard";

const RecipeCard = ({recipeData}) => {
    // may need some states that help us with editing each card
    return (
        <div className={"recipe-card-grid"}>
            <p className={"recipe-name"}>{recipeData.name}</p>
            <img
                className={"recipe-img"}
                src={recipeData.src}
                alt={recipeData.name}
            />
            <div className={"recipe-progress"}>
                <p>Proficiency: {recipeData.currentProficiency}/{recipeData.rarity * 5}</p>
                <p>Custom Qty: {recipeData.qty}/{recipeData.want}</p>
            </div>
            <div className={"recipe-ingredient-div"}>
                {renderIngredients(recipeData.craftsFrom)}
            </div>
        </div>
    );
}

function renderIngredients(ingredientsArray) {
    let ingredientsList = [];
    if (ingredientsArray !== undefined) {
        ingredientsArray.forEach(arr => {
            // raw ingredients
            arr[0].raw.forEach(ing => {
                ingredientsList.push(
                    <RecipeIngredientMiniCard
                        ingredientData={ing}
                    />
                );
            })

            // crafted ingredients
            arr[1].crafted.forEach(ing => {
                ingredientsList.push(
                    <RecipeIngredientMiniCard
                        ingredientData={ing}
                    />
                );
            })
        })

        return ingredientsList;
    }
    return null;
}

export default RecipeCard;