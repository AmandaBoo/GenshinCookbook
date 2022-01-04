import React, {useState} from 'react';
import * as storage from "../../storageInterfaces/storageInterface";
import {AlchemyCard} from "./AlchemyCard";


export const AlchemyCardDisplay = ({allCardData, onUpdate}) => {
    return (
        <div>
            <div className={"cards flex-center"}>
                {renderCards(allCardData, onUpdate)}
            </div>
        </div>
    )
}

function renderCards(allCardData, onUpdate) {
    allCardData = storage.sortFoodRecipesByUIOrder(allCardData);
    let cardList = [];
    if (allCardData !== undefined) {
        allCardData.forEach(data => {
            cardList.push(
                <AlchemyCard
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
