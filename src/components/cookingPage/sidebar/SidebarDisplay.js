import React from 'react'
import {Icon} from "../../shared/Icon";
import GroceryDisplay from "./groceryList/GroceryDisplay";
import {CookingPotDisplay} from "./cookingPot/CookingPotDisplay";
import {HelpGuideContainer} from "../../helpGuide/HelpGuideContainer";
import {HELP_GUIDE_ID, RECIPES_POPUP_ID} from "../../../constants/constants";
import Button from "../../shared/buttons/Button";
import {RecipesContainer} from "../cookbook/RecipesContainer";

const SidebarDisplay = ({recipes, rawIngredientsDTOList, craftedIngredientsDTOList, selectedMenu, setSelectedMenu,
                            onMiniIngredientEditSaveClick, onCraftIngredientCookSaveClick,
                            imgSrcList, imgSrcListIds}) => {
    return (
        <div className={"sidebar-display"}>
            <div className={"add-recipe-button-div flex-center"}>
                <Button
                    classNames={'recipe-popup-button'}
                    text={"Recipes"}
                    onClick={() => setSelectedMenu(RECIPES_POPUP_ID)}
                />
                {/*<Button*/}
                {/*    text={"Help Guide"}*/}
                {/*    onClick={() => setSelectedMenu(HELP_GUIDE_ID)}*/}
                {/*/>*/}
            </div>
            {renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes, imgSrcList, imgSrcListIds)}
            {renderHelpGuidePopup(selectedMenu, setSelectedMenu)}
            <div className={"grocery-div"}>
                <CookingPotDisplay
                    craftIngredientsDTOList={craftedIngredientsDTOList}
                    onCraftIngredientCookSaveClick={(craftIngredientCooked, subIngredientsUsed) =>
                        onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
            </div>
            <div className={"grocery-div"}>
                <GroceryDisplay
                    rawIngredientsDTOList={rawIngredientsDTOList}
                    craftedIngredientsDTOList={craftedIngredientsDTOList}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
            </div>
        </div>
    );
}

function renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes, imgSrcList, imgSrcListIds) {
    if (selectedMenu === RECIPES_POPUP_ID) {
        return (
            <RecipesContainer
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
                imgSrcList={imgSrcList}
                imgSrcListIds={imgSrcListIds}
            />
        );
    }
    return null;
}

function renderHelpGuidePopup(selectedMenu, setSelectedMenu) {
    if (selectedMenu === HELP_GUIDE_ID) {
        return (
            <HelpGuideContainer
                pageName={"cooking"}
                onCloseClick={() => setSelectedMenu(null)}
            />
        )
    }
}

export default SidebarDisplay;