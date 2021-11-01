import React, {useState} from 'react';
import CookbookCard from "./CookbookCard";
import * as storage from "../../../storageInterfaces/storageInterface";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const CookbookCardDisplay = ({allCardData, onUpdate}) => {
    const [filterByMastery, setFilterByMastery] = useState(false);
    return (
        <div>
            {/*<div className={"cards"}>*/}
            {/*    {renderMasteryFilter(filterByMastery, setFilterByMastery)}*/}
            {/*</div>*/}
            <div className={"cards"}>
                {renderCards(allCardData, onUpdate)}
            </div>
        </div>
    )
}

function renderMasteryFilter(filterByMastery, setFilterByMastery) {
    if (filterByMastery) {
        return (
            <RadioButtonCheckedIcon/>
        );
    } else {
        return (
            <RadioButtonUncheckedIcon/>
        );
    }
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