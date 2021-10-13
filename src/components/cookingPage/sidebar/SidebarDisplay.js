import React from 'react'
import {AddRecipePopup} from "../cookbook/CookbookManager";
import {Icon} from "../../shared/Icon";
import GroceryDisplay from "./grocery/GroceryDisplay";

const SidebarDisplay = ({recipes, rawIngredientsDTOList, craftedIngredientsDTOList, selectedMenu, setSelectedMenu}) => {
    return (
        <div className={"sidebar-display"}>
            <div className={"add-recipe-button-div"}>
                <Icon
                    id={"recipe-card-icon"}
                    text={"Add Recipe Card"}
                    onClick={i => setSelectedMenu(i)}
                />
            </div>
            <AddRecipePopup
                doRender={selectedMenu === "recipe-card-icon"}
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
            />
            <div className={"grocery-div"}>
                <GroceryDisplay
                    rawIngredientsDTOList={rawIngredientsDTOList}
                    craftedIngredientsDTOList={craftedIngredientsDTOList}
                />
            </div>
        </div>
    )
}

export default SidebarDisplay;