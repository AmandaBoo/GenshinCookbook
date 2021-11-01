import React, {useState} from 'react';
import MiniIngredientCard from "../shared/MiniIngredientCard";
import RecipeQtyEditPopup from "../shared/RecipeQtyEditPopup";
import DeleteConfirmationPopup from "../shared/DeleteConfirmationPopup";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Utils from "../../../util/utils";
import {RecipeCookingPopup} from "./RecipeCookingPopup";

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
        <div className={"recipe-top-bar"}>
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
            <div className={`recipe-img-div ${!recipeData.enabled ? "disabled-card": ""}`}>
                <img
                    className={"recipe-img"}
                    style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + recipeData.rarity + '_background_cropped.jpg")'}}
                    src={recipeData.src}
                    alt={recipeData.name}
                />
            </div>
            <div className={`recipe-progress ${!recipeData.enabled ? "disabled-card": ""}`}>
                <span className={"progress-field prof-field"}>
                    <div className={"recipe-progress-fields"}>Proficiency :</div>
                    <p className={"recipe-data-field"}>{recipeData.currentProficiency}/{recipeData.rarity * 5}</p>
                </span>

                <span className={"progress-field"}>
                    <div className={"recipe-progress-fields"}>Amount to Cook :</div>
                    <p className={"recipe-data-field"}>{recipeData.qty}/{recipeData.want}</p>
                </span>

                <div className={`cook-button-div ${!recipeData.enabled ? "disabled-card": ""}`}>
                    <button
                        className={`modal-button`}
                        onClick={() => setPopup("cooking")}
                    >
                        Cook
                    </button>
                </div>
            </div>
            <div className={"recipe-ingredient-div"}>
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
                        isRecipeCard={true}
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
                        isRecipeCard={true}
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
            <RecipeQtyEditPopup
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

export default RecipeCard;