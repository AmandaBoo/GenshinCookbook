import React, {useState} from 'react';
import RecipeCard from "./RecipeCard";

const RecipeCardDisplay = ({cardData, onUpdate}) => {
    return (
        <div className={"cards"}>
            {renderCards(cardData, onUpdate)}
        </div>
    )
}

function renderCards(cardData, onUpdate) {
    let cardList = [];
    if (cardData !== undefined) {
        cardData.forEach(data => {
            cardList.push(
                <RecipeCard
                    cardData={data}
                    onCardClick={() => {
                        onUpdate(data);
                    }}
                />
            );
        });
        return cardList;
    }
    return null;
}

export default RecipeCardDisplay;