import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

export const AlchemyCard = ({cardData, onCardClick}) => {
    return (
        <div
            id={cardData.name}
            className={"cookbook-card text-align-center"}
            onClick={onCardClick}
        >
            {renderCheckmark(cardData.currentProficiency === cardData.rarity * 5)}
            <div
                style={{ backgroundImage: 'url("./images/backgrounds/Rarity_' + cardData.rarity + '_background_cropped.jpg")'}}
                className={'card-img'}
            >
                {generateImage(cardData)}
            </div>
            {generateLabel(cardData)}
        </div>
    );
}

function generateImage(recipeData) {
    return (
        <img
            className={"card-icon"}
            src={"./images/alchemyRecipeManagerIcon/" + recipeData.src + ".png"}
            alt={recipeData.name}
        />
    );
}

function renderCheckmark(isMastered) {
    if (isMastered) {
        return (
            <div className={'checkmark-overlay'}>
                <CheckCircleTwoToneIcon/>
            </div>
        );
    }
}

function generateLabel(data) {
    return (
        <label className={"recipe-label-field"}>
            {data.name}
        </label>
    );
}