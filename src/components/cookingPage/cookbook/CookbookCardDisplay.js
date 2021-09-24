import React from 'react';
import CookbookCard from "./CookbookCard";

const CookbookCardDisplay = ({cardData, onUpdate}) => {
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
                <CookbookCard
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

export default CookbookCardDisplay;