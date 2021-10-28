import React, {useState} from 'react';
import CloseButton from "../../shared/CloseButton";
import SaveButton from "../../shared/SaveButton";
import MiniIngredientCard from "../shared/MiniIngredientCard";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const CookingPopup = ({recipe, onCloseClick, onSaveClick, onMiniIngredientEditSaveClick}) => {
    const [cookQty, setCookQty] = useState(calculateMaxCraftQty(recipe));
    const maxQty = calculateMaxCraftQty(recipe);
    return (
        <div className={"message-modal"}>
            <div className={"vertical-center"}>
                <div className={"cooking-popup"}>
                    {createTopBar(recipe, onCloseClick)}
                    {createCookingField(recipe, cookQty, setCookQty, maxQty)}
                    {createProgressDisplay(cookQty, recipe)}
                    <div>
                        <div className={"ingredients-div"}>
                            <div className={"ingredients-wrapper"}>
                                <div className={"ingredient-cards-title"}>
                                    INGREDIENTS REQUIRED
                                </div>
                                <div className={"ingredient-cards"}>
                                    {createIngredientsRequiredDisplay(recipe, cookQty, onMiniIngredientEditSaveClick)}
                                </div>
                            </div>
                            {createIngredientsBorder(getMissingIngredients(recipe, cookQty))}
                            {createMissingIngredientsDiv(recipe, cookQty, getMissingIngredients(recipe, cookQty), onMiniIngredientEditSaveClick)}
                        </div>
                    </div>
                    {createConfirmCookButton(cookQty, recipe, onSaveClick, onCloseClick)}
                </div>
            </div>
        </div>
    );
}

function createTopBar(recipe, onCloseClick) {
    return (
        <div className={"top-bar"}>
            <div>
                <span className={"cook-header-text"}>
                    Cook {recipe.name}
                </span>
                <CloseButton
                    onCloseClick={() => {
                        onCloseClick();
                        resetState();
                    }}
                >
                </CloseButton>
            </div>
        </div>
    );
}

function createCookingField(recipe, cookQty, setCookQty, maxQty) {
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
                    title={"Based on your Inventory, you should be able to make " + maxQty + " dishes"}
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

function createProgressDisplay(cookQty, recipe) {
    let recipeProfPostCook;
    let recipeQtyPostCook;
    if (isNaN(cookQty)) {
        recipeProfPostCook = recipe.currentProficiency;
        recipeQtyPostCook = recipe.qty;
    } else {
        recipeProfPostCook = recipe.currentProficiency + cookQty;
        let recipeMaxProf = recipe.rarity * 5;

        recipeProfPostCook = recipeProfPostCook > recipeMaxProf ? recipeMaxProf : recipeProfPostCook;
        recipeQtyPostCook = recipe.qty + cookQty;
        recipeQtyPostCook = recipeQtyPostCook > recipe.want ? recipe.want : recipeQtyPostCook;
    }
    return (
        <div className={"progress-display-div"}>
            <span>Proficiency: {recipeProfPostCook} / {recipe.rarity * 5}</span>
            <span>Custom Qty: {recipeQtyPostCook} / {recipe.want}</span>
        </div>
    );
}

function resetFieldOnLeave(value, setter) {
    if (value === "") {
        setter(0);
    }
}

function calculateMaxCraftQty(recipe) {
    let maxCraftQty = [];
    let allIngredients = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);

    allIngredients.forEach(ingMap => {
        let curQty = ingMap.ingredient.qty;
        let qtyRequiredPerCook = ingMap.qtyRequired;
        let maxCookQtyForIngredient = Math.floor(curQty / qtyRequiredPerCook);
        maxCraftQty.push(maxCookQtyForIngredient);
    });

    maxCraftQty.push(recipe.want);
    return Math.min(...maxCraftQty);
}

function createIngredientsRequiredDisplay(recipe, cookQty, onMiniIngredientEditSaveClick) {
    let miniIngredientCards = [];
    let allIngredients = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
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
                onEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
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

function createMissingIngredientsDiv(recipe, cookQty, missingIngredientsList, onMiniIngredientEditSaveClick) {
    if (missingIngredientsList.length !== 0) {
        return (
            <div className={"ingredients-wrapper"}>
                <div className={"ingredient-cards-title"}>
                    INGREDIENTS MISSING
                </div>
                <div className={"ingredient-cards"}>
                    {createIngredientsMissingDisplay(recipe, cookQty, getMissingIngredients(recipe, cookQty), onMiniIngredientEditSaveClick)}
                </div>
            </div>
        );
    }
    return null;
}

function createIngredientsMissingDisplay(recipe, cookQty, missingIngredientList, onMiniIngredientEditSaveClick) {
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

function getMissingIngredients(recipe, cookQty) {
    let missingIngredientList = [];
    let allIngredients = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    allIngredients.forEach(ingMap => {
        let qtyToDeduct = isNaN(cookQty) ? 0 : cookQty * ingMap.qtyRequired;
        let curQty = ingMap.ingredient.qty;
        if (curQty < qtyToDeduct) {
            missingIngredientList.push(ingMap);
        }
    });
    return missingIngredientList;
}

function updateRecipeBeforeSave(cookQty, recipe) {
    let allIngredients = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    allIngredients.forEach(ingMap => {
        let qtyToDeduct = cookQty * ingMap.qtyRequired;
        let qtyLeft = ingMap.ingredient.qty - qtyToDeduct;
        ingMap.ingredient.qty = qtyLeft < 0 ? 0 : qtyLeft;
    })

    let recipeProfPostCook = recipe.currentProficiency + cookQty;
    let recipeMaxProf = recipe.rarity * 5;
    recipe.currentProficiency = recipeProfPostCook > recipeMaxProf ? recipeMaxProf : recipeProfPostCook;
    recipe.mastery = recipe.currentProficiency === recipeMaxProf;

    let recipeQtyPostCook = recipe.qty + cookQty;
    recipe.qty = recipeQtyPostCook > recipe.want ? recipe.want : recipeQtyPostCook;

    return recipe;
}

function createConfirmCookButton(cookQty, recipe, saveClick, onCloseClick) {
    return (
        <div>
            <SaveButton
                saveText={"Cook"}
                onSaveClick={() => {
                    recipe = updateRecipeBeforeSave(cookQty, recipe)
                    saveClick(recipe);
                    onCloseClick();
                }}
                isDisabled={isNaN(cookQty) || cookQty === 0}
            />
        </div>
    );
}

function resetState() {

}