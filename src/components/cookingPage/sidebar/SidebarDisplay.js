import React, {useState} from 'react'
import {AddRecipePopup} from "../cookbook/CookbookManager";
import {Icon} from "../../shared/Icon";

const SidebarDisplay = ({recipes, selectedMenu, setSelectedMenu}) => {
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
            {/*    cooking pot*/}
            <div>COOKING POT HERE</div>
            {/*    grocery display*/}
            <div>GROCERY LIST HERE</div>
        </div>
    )
}

export default SidebarDisplay;