import React, { useState} from 'react';

const IngredientCard = ({cardData}) => {
    const [qty, setQty] = useState(cardData.qty);
    return (
        <div
            id={cardData.name}
            className={"ingredient-card"}
        >
            {generateImage(cardData)}
            {generateTextField(cardData, qty, setQty)}
        </div>
    );
}

function generateImage(ingredientData) {
    return (
        <div
            style={{ backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientData.rarity + '_background_cropped.jpg")'}}
            className={'card-img'}
        >
            <img
                className={"card-icon"}
                src={ingredientData.src}
                alt={ingredientData.name}
            />
        </div>
    );
}
function resetFieldOnLeave(value, setter, data) {
    if (value === "") {
        setter(0); //state of field set to 0
        data.qty = 0; //inventory obj qty set to 0
    }
}
function generateTextField(data, qty, setQty) {
    return (
        <input
            className={"text-field card-text-field"}
            type={"number"}
            value={qty}
            onKeyDown={ (evt) => (evt.key === 'e' ||evt.key === '.' ||evt.key === '-') && evt.preventDefault() }
            
            onChange={event => {
                data.qty = event.target.value;
                setQty(event.target.value);
            }}
            onFocus={(event) => event.target.select()}
            onBlur={(event) => resetFieldOnLeave(event.target.value, setQty,data)}
        />
    );
}

export default IngredientCard;