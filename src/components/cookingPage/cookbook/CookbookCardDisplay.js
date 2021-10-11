import React from 'react';
import CookbookCard from "./CookbookCard";
import * as storage from "../../../storageInterfaces/storageInterface";

const CookbookCardDisplay = ({allCardData, onUpdate}) => {
    return (
        <div className={"cards"}>
            {renderCards(allCardData, onUpdate)}
        </div>
    )
}

function renderCards(allCardData, onUpdate) {
    allCardData = storage.sortFoodRecipesByUIOrder(allCardData);
    let cardList = [];
    if (allCardData !== undefined) {
        allCardData.forEach(data => {
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