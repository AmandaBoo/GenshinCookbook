import React from 'react';
import IngredientCard from "./IngredientCard";

const IngredientCardDisplay = ({cardData}) => {
    return (
        <div className={"cards"}>
            {renderCards(cardData)}
        </div>
    )
}

function renderCards(cardData) {
    let cardList = [];
    if (cardData !== undefined) {
        cardData.forEach(data => {
            // TODO : FIX UNIQUE KEY PROP WARNING
                cardList.push(
                    <IngredientCard
                        cardData={data}
                    />
                );
            }
        );
        console.log(cardList);
        return cardList;
    }
    return null;
}

export default IngredientCardDisplay;