import React, {useState} from 'react';
import MiniIngredientCard from "../shared/MiniIngredientCard";
import RecipeQtyEditPopup from "../shared/RecipeQtyEditPopup";
import DeleteConfirmationPopup from "../shared/DeleteConfirmationPopup";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import * as Utils from "../../../util/utils";

// TODO : FIX THE STYLING FOR DISABLE HERE
const RecipeCard = ({recipeData, onCardDelete, onCardEdit, onCardEnableDisable}) => {
    const [popup, setPopup] = useState(null);

    return (
        <div className={
            `recipe-card-grid card
            ${!recipeData.enabled ? "disabled-card": "enabled-card"}
            `}>
            {createTopBar(recipeData, setPopup, onCardEnableDisable)}
            {createRecipeCardBody(recipeData)}
            {renderQuantityEditPopup(popup, setPopup, recipeData, onCardEdit)}
            {renderDeleteConfirmationPopup(popup, setPopup, recipeData, onCardDelete)}
        </div>
    );
}

function createTopBar(recipeData, setPopup, onCardEnableDisable) {
    return (
        <div className={"recipe-top-bar"}>
            <>
                <DeleteOutlineRoundedIcon
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

function createRecipeCardBody(recipeData) {
    return (
        <>
            <div className={"recipe-img-div"}>
                <img
                    className={
                        `recipe-img
                        ${!recipeData.enabled ? "disabled-img" : ""}`
                    }
                    style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + recipeData.rarity + '_background_cropped.jpg")'}}
                    src={recipeData.src}
                    alt={recipeData.name}
                />
            </div>
            <div className={"recipe-progress"}>
                <p className={
                    `${!recipeData.enabled ? "disabled-progress" : "enabled-progress"}
                    recipe-progress-fields`
                }>
                    Proficiency: {recipeData.currentProficiency}/{recipeData.rarity * 5}
                </p>
                <p className={
                    `${!recipeData.enabled ? "disabled-progress" : "enabled-progress"}
                    recipe-progress-fields`
                }>
                    Custom Qty: {recipeData.qty}/{recipeData.want}
                </p>
            </div>
            <div className={"recipe-ingredient-div"}>
                {renderIngredients(recipeData.craftsFrom, recipeData.enabled)}
            </div>
        </>
    );
}

function renderIngredients(allIngredients, isEnabled) {
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

function onCloseClick(setPopup) {
    setPopup(null);
}

export default RecipeCard;