import React from 'react'
import {CookbookManager} from "../cookbook/CookbookManager";
import {Icon} from "../../shared/Icon";
import GroceryDisplay from "./groceryList/GroceryDisplay";
import {CookingPotDisplay} from "./cookingPot/CookingPotDisplay";

const SidebarDisplay = ({recipes, rawIngredientsDTOList, craftedIngredientsDTOList, selectedMenu, setSelectedMenu,
                            onMiniIngredientEditSaveClick, onCraftIngredientCookSaveClick}) => {
    return (
        <div className={"sidebar-display"}>
            <div className={"add-recipe-button-div"}>
                <Icon
                    id={"recipe-card-icon"}
                    text={"Add Recipe Card"}
                    onClick={i => setSelectedMenu(i)}
                />
                <Icon
                    id={"help-guide-icon"}
                    text={"Help Guide"}
                    onClick={() => setSelectedMenu("help-guide-icon")}
                />
            </div>
            {renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes)}
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

function renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes) {
    if (selectedMenu === "recipe-card-icon") {
        return (
            <CookbookManager
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
            />
        );
    }
    return null;
}

export default SidebarDisplay;