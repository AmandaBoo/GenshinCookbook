import React from 'react';

const CookbookCard = ({cardData, onCardClick}) => {
    return (
        <div
            id={cardData.name}
            className={"add-recipe-card"}
            style={{ backgroundImage: 'url("./images/backgrounds/Rarity_' + cardData.rarity + '_background.png")'}}
            onClick={onCardClick}
        >
            {generateImage(cardData)}
            {generateLabel(cardData)}
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

function generateLabel(data) {
    return (
      <label className={"recipe-label-field"}>
          {data.name}
      </label>
    );
}

export default CookbookCard;