import React from 'react';

const MiniIngredientCard = ({ingredientData, qtyRequired}) => {
    // TODO : ADD EDIT FUNCTIONALITY FOR EACH MINI CARD HERE
    return (
        <div className={"mini-ingredient-container"}>
            <img
                className={"mini-ingredient-card"}
                src={ingredientData.src}
                alt={ingredientData.name}
                style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientData.rarity + '_background_cropped.jpg")'}}
            />
            <div
                className={"ingredient-count-overlay"}
            > {qtyRequired}
            </div>
        </div>
    )
}

export default MiniIngredientCard;