import React, {useState} from 'react';
import MiniIngredientCard from "../shared/MiniIngredientCard";
import RecipeQtyEditPopup from "../shared/RecipeQtyEditPopup";
import DeleteConfirmationPopup from "../shared/DeleteConfirmationPopup";

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
                <img
                    onClick={() => setPopup("trash")}
                    className={"button"}
                    src={"./images/icons/trashIcon.png"}
                    alt={"trash-icon.png"}
                />
            </>
            <div className={"recipe-name"}>{recipeData.name}</div>
            <>
                <img
                    onClick={() => onCardEnableDisable(recipeData)}
                    className={"button power-button"}
                    src={"./images/icons/powerIcon.png"}
                    alt={"edit-icon.png"}
                />
                <img
                    onClick={() => setPopup("edit")}
                    className={"button"}
                    src={"./images/icons/editIcon.png"}
                    alt={"edit-icon.png"}
                />
            </>
        </div>
    );
}

function createRecipeCardBody(recipeData) {
    return (
        <>
            <img
                className={
                    `recipe-img
                    ${!recipeData.enabled ? "disabled-img" : ""}`
                }
                style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + recipeData.rarity + '_background_cropped.jpg")'}}
                src={recipeData.src}
                alt={recipeData.name}
            />
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

function renderIngredients(ingredientsArray, isEnabled) {
    console.log("TRYING TO CREATE MINI", ingredientsArray);
    let ingredientCards = [];
    if (ingredientsArray !== undefined) {
        ingredientsArray.forEach(arr => {
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