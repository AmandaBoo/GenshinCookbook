import React, { useState} from 'react';

const IngredientCard = ({cardData}) => {
    const [qty, setQty] = useState(cardData.qty);
    return (
        <div>
            <div
                id={cardData.name}
                className={"ingredient-card"}
                style={{ backgroundImage: 'url("./images/backgrounds/Rarity_' + cardData.rarity + '_background.png")'}}
            >
                {generateImage(cardData)}
                {generateTextField(cardData, qty, setQty)}
            </div>
        </div>
    );
}

function generateImage(data) {
    return (
        <img
            className={"card-icon"}
            src={data.src}
            alt={data.name}
        />
    );
}

function generateTextField(data, qty, setQty) {
    return (
        <input
            className={"card-text-field"}
            type={"number"}
            value={qty}
            onChange={event => {
                data.qty = event.target.value;
                setQty(event.target.value);
                // resetFieldIfBlank(data, event);
            }}
            onFocus={(event) => event.target.select()}
        />
    );
}

// TODO : IMPLEMENT BLANK HANDLING
// function resetFieldIfBlank(ingredient, field) {
//
// }

export default IngredientCard;