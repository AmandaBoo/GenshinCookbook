import React, {useState} from 'react';
import CloseButton from "../../../shared/CloseButton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MiniIngredientCard from "../../shared/MiniIngredientCard";
import SaveButton from "../../../shared/SaveButton";
import {ModalComponent} from "../../../shared/ModalComponent";

export const CookingPotCookingPopup = ({processedIngredient, onCloseClick, onSaveClick, onMiniIngredientEditSaveClick}) => {
    const [cookQty, setCookQty] = useState(calculateMaxCraftQty(processedIngredient));
    const maxQty = calculateMaxCraftQty(processedIngredient);

    return (
        <ModalComponent>
            <div className={"cooking-popup popup"}>
                {createTopBar(processedIngredient, onCloseClick)}
                {createCookingField(processedIngredient, cookQty, setCookQty, maxQty)}
                <div>
                    <div className={"ingredients-div"}>
                        <div className={"ingredients-wrapper"}>
                            <div className={"ingredient-cards-title"}>
                                INGREDIENTS REQUIRED
                            </div>
                            <div className={"ingredient-cards"}>
                                {createIngredientsRequiredDisplay(processedIngredient, cookQty, setCookQty, onMiniIngredientEditSaveClick)}
                            </div>
                        </div>
                        {createIngredientsBorder(getMissingIngredients(processedIngredient, cookQty))}
                        {createMissingIngredientsDiv(processedIngredient, cookQty, getMissingIngredients(processedIngredient, cookQty), onMiniIngredientEditSaveClick)}
                    </div>
                </div>
                {createConfirmCookButton(cookQty, processedIngredient, onSaveClick, onCloseClick)}
            </div>
        </ModalComponent>
    );
}

function createTopBar(processedIngredient, onCloseClick) {
    return (
        <div className={"top-bar"}>
            <div>
                <span className={"cook-header-text"}>
                    Process {processedIngredient.ingredient.name}
                </span>
                <CloseButton
                    onCloseClick={() => {
                        onCloseClick();
                    }}
                >
                </CloseButton>
            </div>
        </div>
    );
}

function createCookingField(processedIngredientDTO, cookQty, setCookQty, maxQty) {
    return (
        <div className={"cooking-parent"}>
            <div className={"cooking-field-title"}>HOW MANY</div>
            <div className={"cooking-body"}>
                <div className={"cooking-field-div"}>
                    <input
                        id={"cooking-text-field"}
                        className={"text-field"}
                        type={"number"}
                        value={cookQty}
                        onKeyDown={(event) => {
                            if (event.key === "-") {
                                event.preventDefault();
                            }
                        }}
                        onChange={event => setValuesIfValid(event.target.value, setCookQty)}
                        onFocus={(event) => event.target.select()}
                        onBlur={(event) => resetFieldOnLeave(event.target.value, setCookQty)}
                    >
                    </input>
                </div>
                <Tooltip
                    title={"Based on your Inventory, you should be able to make " + maxQty + " " + processedIngredientDTO.ingredient.name + " of the " + processedIngredientDTO.qtyToObtain + " you need"}
                >
                    <IconButton>
                        <InfoIcon className={"info-icon"}/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

function setValuesIfValid(eventValue, setter) {
    if (!isNaN(eventValue)) {
        setter(parseInt(eventValue));
    }
}

function resetFieldOnLeave(value, setter) {
    if (value === "") {
        setter(0);
    }
}

function calculateMaxCraftQty(processedIngredientDTO) {
    let maxCraftQty = [];
    let allIngredients = processedIngredientDTO.ingredient.craftsFrom[0];

    allIngredients.forEach(ingMap => {
        let curQty = ingMap.ingredient.qty;
        let qtyRequiredPerCook = ingMap.qtyRequired;
        let maxCookQtyForIngredient = Math.floor(curQty / qtyRequiredPerCook);
        maxCraftQty.push(maxCookQtyForIngredient);
    });

    maxCraftQty.push(processedIngredientDTO.qtyToObtain);
    return Math.min(...maxCraftQty);
}

function createIngredientsRequiredDisplay(processedIngredientDTO, cookQty, setCookQty, onMiniIngredientEditSaveClick) {
    let miniIngredientCards = [];
    let allIngredients = processedIngredientDTO.ingredient.craftsFrom[0];
    allIngredients.forEach(ingMap => {
        let qtyToDeduct = isNaN(cookQty) ? 0 : cookQty * ingMap.qtyRequired;
        let curQty = ingMap.ingredient.qty;
        let overlayText = qtyToDeduct + '/' + curQty;
        let isMissingIngredients = curQty < qtyToDeduct;
        miniIngredientCards.push(
            <MiniIngredientCard
                ingredientData={ingMap.ingredient}
                qtyRequired={overlayText}
                needsWarning={isMissingIngredients}
                onEditSaveClick={(ingredient, newQty) => {
                    onMiniIngredientEditSaveClick(ingredient, newQty);
                    setCookQty(calculateMaxCraftQty(processedIngredientDTO));
                }}
            />
        );
    });

    return miniIngredientCards;
}

function createIngredientsBorder(missingIngredientsList) {
    if (missingIngredientsList.length !== 0) {
        return (
            <div
                className={"ingredients-border"}
            />
        )
    }
}

function createMissingIngredientsDiv(processedIngredient, cookQty, missingIngredientsList, onMiniIngredientEditSaveClick) {
    if (missingIngredientsList.length !== 0) {
        return (
            <div className={"ingredients-wrapper"}>
                <div className={"ingredient-cards-title"}>
                    INGREDIENTS MISSING
                </div>
                <div className={"ingredient-cards"}>
                    {createIngredientsMissingDisplay(cookQty, getMissingIngredients(processedIngredient, cookQty), onMiniIngredientEditSaveClick)}
                </div>
            </div>
        );
    }
    return null;
}

function createIngredientsMissingDisplay(cookQty, missingIngredientList, onMiniIngredientEditSaveClick) {
    let miniIngredientCards = [];
    if (missingIngredientList.length !== 0) {
        missingIngredientList.forEach(ingMap => {
            let qtyRequired = (cookQty * ingMap.qtyRequired) - ingMap.ingredient.qty;
            miniIngredientCards.push(
                <MiniIngredientCard
                    ingredientData={ingMap.ingredient}
                    qtyRequired={qtyRequired}
                    onEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
            )
        });
    }
    return miniIngredientCards;
}

function getMissingIngredients(processedIngredientDTO, cookQty) {
    let missingIngredientList = [];
    let allIngredients = processedIngredientDTO.ingredient.craftsFrom[0];
    allIngredients.forEach(ingMap => {
        let qtyToDeduct = isNaN(cookQty) ? 0 : cookQty * ingMap.qtyRequired;
        let curQty = ingMap.ingredient.qty;
        if (curQty < qtyToDeduct) {
            missingIngredientList.push(ingMap);
        }
    });
    return missingIngredientList;
}

function updateRecipeBeforeSave(cookQty, processedIngredientDTO) {
    let allIngredients = processedIngredientDTO.ingredient.craftsFrom[0];
    allIngredients.forEach(ingMap => {
        let qtyToDeduct = cookQty * ingMap.qtyRequired;
        let qtyLeft = ingMap.ingredient.qty - qtyToDeduct;
        ingMap.ingredient.qty = qtyLeft < 0 ? 0 : qtyLeft;
    })

    processedIngredientDTO.ingredient.qty = processedIngredientDTO.ingredient.qty + cookQty;
    return [processedIngredientDTO, allIngredients.map(ing => ing.ingredient)];
}

function createConfirmCookButton(cookQty, processedIngredientDTO, saveClick, onCloseClick) {
    let allIngredientsUsed;
    return (
        <div>
            <SaveButton
                saveText={"Cook"}
                onSaveClick={() => {
                    [processedIngredientDTO, allIngredientsUsed] = updateRecipeBeforeSave(cookQty, processedIngredientDTO)
                    saveClick(processedIngredientDTO, allIngredientsUsed);
                    onCloseClick();
                }}
                isDisabled={isNaN(cookQty) || cookQty === 0}
            />
        </div>
    );
}