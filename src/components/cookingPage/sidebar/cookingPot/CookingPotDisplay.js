import React, {useState} from 'react';
import {CookingPotItemsDisplay} from "./CookingPotItemsDisplay";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CookingPotDisplay = ({craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick})=> {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={"sidebar-card-display"}>
            {renderTopBar(isOpen, setIsOpen)}
            {renderCookingPotItems(craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick, isOpen)}
        </div>
    );
}

function renderTopBar(isOpen, setIsOpen) {
    return (
        <div className={'header-text-container top-bar'}>
            {renderArrows(isOpen, setIsOpen)}
            <div className={"title large-font"}>COOKING POT</div>
        </div>
    );
}

function renderArrows(isOpen, setIsOpen) {
    if (isOpen) {
        return (
            <div className={'dropdown-arrow'}>
                <ExpandLessIcon
                    className={'svg-icon'}
                    onClick={() => setIsOpen(false)}
                />
            </div>
        );
    } else {
        return (
            <div className={'dropdown-arrow'}>
                <ExpandMoreIcon
                    className={'svg-icon'}
                    onClick={() => setIsOpen(true)}
                />
            </div>
        );
    }
}

function renderCookingPotItems(craftIngredientsDTOList, onCraftIngredientCookSaveClick, onMiniIngredientEditSaveClick, isOpen) {
    return (
        <div className={`${isOpen? "" : "dropdown-display-none"}`}>
            <CookingPotItemsDisplay
                craftIngredientDTOList={craftIngredientsDTOList}
                onCraftIngredientCookSaveClick={(craftIngredientCooked, subIngredientsUsed) =>
                    onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
        </div>
    );
}