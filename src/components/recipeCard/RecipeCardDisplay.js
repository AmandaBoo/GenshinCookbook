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
                        data.hasCard = true;
                        onUpdate(data);
                    }}
                />
            );
        });
        return cardList;
    }
    return null;
}

function findCardsClicked(cardData) {
    let cardsClicked = [];
    cardData.forEach(card => {
        if (card.hasCard) {
            cardsClicked.push(card);
        }
    });
    return cardsClicked;
}

export default RecipeCardDisplay;