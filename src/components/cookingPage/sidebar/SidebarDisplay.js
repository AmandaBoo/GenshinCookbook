import React from 'react'
import {AddRecipePopup} from "../cookbook/CookbookManager";
import {Icon} from "../../shared/Icon";
import GroceryDisplay from "./grocery/GroceryDisplay";

const SidebarDisplay = ({recipes, rawIngredientsMap, craftedIngredientsMap, selectedMenu, setSelectedMenu}) => {
    return (
        <div className={"sidebar-display card"}>
            <Icon
                id={"recipe-card-icon"}
                text={"Add Recipe Card"}
                onClick={i => setSelectedMenu(i)}
            />
            <AddRecipePopup
                doRender={selectedMenu === "recipe-card-icon"}
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
            />
            <div>
                <GroceryDisplay
                    rawIngredientsMap={rawIngredientsMap}
                    craftedIngredientsMap={craftedIngredientsMap}
                />
            </div>
        </div>
    )
}

export default SidebarDisplay;