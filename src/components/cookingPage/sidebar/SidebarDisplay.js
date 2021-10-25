import React from 'react'
import {CookbookManager} from "../cookbook/CookbookManager";
import {Icon} from "../../shared/Icon";
import GroceryDisplay from "./grocery/GroceryDisplay";

const SidebarDisplay = ({recipes, rawIngredientsDTOList, craftedIngredientsDTOList, selectedMenu, setSelectedMenu, onMiniIngredientEditSaveClick}) => {
    return (
        <div className={"sidebar-display"}>
            <div className={"add-recipe-button-div"}>
                <Icon
                    id={"recipe-card-icon"}
                    text={"Add Recipe Card"}
                    onClick={i => setSelectedMenu(i)}
                />
                {/*<Icon*/}
                {/*    id={"priority-icon"}*/}
                {/*    text={"Manage Priority"}*/}
                {/*    onClick={i => setSelectedMenu(i)}*/}
                {/*/>*/}
            </div>
            <CookbookManager
                doRender={selectedMenu === "recipe-card-icon"}
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
            />
            <div className={"grocery-div"}>
                <GroceryDisplay
                    rawIngredientsDTOList={rawIngredientsDTOList}
                    craftedIngredientsDTOList={craftedIngredientsDTOList}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
            </div>
        </div>
    )
}

export default SidebarDisplay;