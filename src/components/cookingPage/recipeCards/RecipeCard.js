import React, {useState} from 'react';
import MiniIngredientCard from "../shared/MiniIngredientCard";
import FoodRecipeQtyEditPopup from "../shared/FoodRecipeQtyEditPopup";
import DeleteConfirmationPopup from "../shared/DeleteConfirmationPopup";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Utils from "../../../util/utils";
import {RecipeCookingPopup} from "./RecipeCookingPopup";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

const RecipeCard = ({recipeData, onCardDelete, onCardEdit, onCardEnableDisable, onCardCook, onMiniIngredientEditSaveClick}) => {
    const [popup, setPopup] = useState(null);
    return (
        <div>
            <div className={"recipe-card-grid card"}>
                {createTopBar(recipeData, setPopup, onCardEnableDisable)}
                {createRecipeCardBody(recipeData, setPopup, onMiniIngredientEditSaveClick)}
            </div>
            {renderQuantityEditPopup(popup, setPopup, recipeData, onCardEdit)}
            {renderDeleteConfirmationPopup(popup, setPopup, recipeData, onCardDelete)}
            {renderCookingPopup(recipeData, popup, setPopup, onCardCook, onMiniIngredientEditSaveClick)}
        </div>

    );
}

function createTopBar(recipeData, setPopup, onCardEnableDisable) {
    return (
        <div className={"recipe-top-bar flex-center"}>
            <>
                <DeleteIcon
                    onClick={() => setPopup("trash")}
                    className={"svg-icon"}
                />
            </>
            <div className={"recipe-name"}>{Utils.getTruncatedName(recipeData.name, Utils.MAX_CARD_NAME_LENGTH)}</div>
            <>
                <PowerSettingsNewRoundedIcon
                    onClick={() => onCardEnableDisable(recipeData)}
                    className={"svg-icon power-button-margin"}
                />
                <EditRoundedIcon
                    onClick={() => setPopup("edit")}
                    className={"svg-icon"}
                />
            </>
        </div>
    );
}

function createRecipeCardBody(recipeData, setPopup, onMiniIngredientEditSaveClick) {
    return (
        <>
            <div className={`flex-center ${!recipeData.enabled ? "disabled-card": ""}`}>
                <img
                    className={"recipe-img"}
                    style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + recipeData.rarity + '_background_cropped.jpg")'}}
                    src={"./images/foodRecipeCardIcon/" + recipeData.src + ".png"}
                    alt={recipeData.name}
                />
            </div>
            <div className={`recipe-progress ${!recipeData.enabled ? "disabled-card": ""}`}>
                <span className={"progress-field flex-center prof-field"}>
                    <div className={"recipe-progress-fields"}>Proficiency :</div>
                    <p className={"recipe-data-field"}>{recipeData.currentProficiency}/{recipeData.rarity * 5}</p>
                    {renderCompletedCheckmark(recipeData.currentProficiency === recipeData.rarity * 5)}
                </span>

                <span className={"progress-field flex-center"}>
                    <div className={"recipe-progress-fields"}>Amount to Cook :</div>
                    <p className={"recipe-data-field"}>{recipeData.qty}/{recipeData.want}</p>
                    {renderCompletedCheckmark(recipeData.qty === recipeData.want)}
                </span>

                <div className={`cook-button-div flex-center ${!recipeData.enabled ? "disabled-card": ""}`}>
                    <button
                        className={`modal-button`}
                        onClick={() => setPopup("cooking")}
                    >
                        Cook
                    </button>
                </div>
            </div>
            <div className={"recipe-ingredient-div flex-center"}>
                {renderIngredients(recipeData.craftsFrom, recipeData.enabled, onMiniIngredientEditSaveClick)}
            </div>
        </>
    );
}

function renderIngredients(allIngredients, isEnabled, onEditSaveClick) {
    let ingredientCards = [];
    if (allIngredients !== undefined) {
        allIngredients.forEach(arr => {
            // raw ingredients
            arr[0].raw.forEach(ing => {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={ing.ingredient}
                        isEnabled={isEnabled}
                        qtyRequired={ing.qtyToObtain}
                        onEditSaveClick={(ingredient, ingredientQty) => onEditSaveClick(ingredient, ingredientQty)}
                    />
                );
            })

            // crafted ingredients
            arr[1].crafted.forEach(ing => {
                ingredientCards.push(
                    <MiniIngredientCard
                        ingredientData={ing.ingredient}
                        isEnabled={isEnabled}
                        qtyRequired={ing.qtyToObtain}
                        onEditSaveClick={(ingredient, ingredientQty) => onEditSaveClick(ingredient, ingredientQty)}
                    />
                );
            })
        })

        return ingredientCards;
    }
    return null;
}

function renderQuantityEditPopup(popup, setPopup, recipeCard, onCardEdit) {
    if (popup === "edit") {
        return (
            <FoodRecipeQtyEditPopup
                topBarText={"Edit Recipe"}
                selectedRecipeCard={recipeCard}
                onSaveClick={(recipeCard, currentProf, customQty) => {
                    onCardEdit(recipeCard, currentProf, customQty);
                    onCloseClick(setPopup);
                }}
                onCloseClick={() => onCloseClick(setPopup)}
            />
        );
    }
}

function renderDeleteConfirmationPopup(popup, setPopup, recipeCard, onCardDelete) {
    if (popup === "trash") {
        return (
            <DeleteConfirmationPopup
                deleteMessage={"recipe"}
                closeClick={() => onCloseClick(setPopup)}
                saveClick={() => {
                    onCardDelete(recipeCard);
                    onCloseClick(setPopup);
                }}
            />
        )
    }
}

function renderCookingPopup(recipe, popup, setPopup, onCardCook, onMiniIngredientEditSaveClick) {
    if (popup === "cooking") {
        return (
            <RecipeCookingPopup
                recipe={recipe}
                onCloseClick={() => onCloseClick(setPopup)}
                onSaveClick={(card) => onCardCook(card)}
                onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
            />
        )
    }
}

function onCloseClick(setPopup) {
    setPopup(null);
}

function renderCompletedCheckmark(isComplete) {
    if (isComplete) {
        return (
            <CheckCircleTwoToneIcon
                className={'checkmark-overlay padding-left'}
                fontSize={"small"}
            />
        );
    }
}

export default RecipeCard;