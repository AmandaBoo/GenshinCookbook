import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Button from "../shared/buttons/Button";
import {INVENTORY_POPUP_ID} from "../../constants/constants";
import {InventoryContainer} from "../inventory/InventoryContainer";
import {SideMenu} from "./SideMenu";

export const MainNavBar = ({onInventorySave, onInventoryClose, rawIngredients, craftIngredients}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    return (
        <div className={"inner-nav-bar"}>
            <SideMenu/>
            <div className={'mobile-logo-link-container'}>
                <NavLink className={"logo-link"} exact={true} to={"/"}>
                    <img className={"logo"} src={"./images/iconsDisplay/genshinCookbook.svg"} alt={"genshinCookbookLogo"}/>
                </NavLink>
            </div>
            <NavLink className={"desktop-nav-bar-links"} to={"/summary"} activeClassName={"nav-bar-link-selected"}>Summary</NavLink>
            <NavLink className={"desktop-nav-bar-links"} to={"/cooking"} activeClassName={"nav-bar-link-selected"}>Cooking</NavLink>
            <NavLink className={"desktop-nav-bar-links"} to={"/potions"} activeClassName={"nav-bar-link-selected"}>Potions</NavLink>
            <NavLink className={"desktop-nav-bar-links"} to={"/smithing"} activeClassName={"nav-bar-link-selected"}>Smithing</NavLink>
            <div className={"inventory-icon"}>
                <Button
                    text={"Inventory"}
                    onClick={() => setSelectedMenu(INVENTORY_POPUP_ID)}
                />
            </div>
            {renderInventory(selectedMenu === INVENTORY_POPUP_ID, rawIngredients, craftIngredients,
                onInventorySave, onInventoryClose, setSelectedMenu)}
        </div>
    );
}

function renderInventory(doRender, rawIngredients, craftIngredients, onSaveClick, onCloseClick, setSelectedMenu) {
    if (doRender) {
        return (
            <InventoryContainer
                rawIngredients={rawIngredients}
                craftIngredients={craftIngredients}
                onSaveClick={() => onSaveClick()}
                onCloseClick={() => {
                    setSelectedMenu(null);
                    onCloseClick();
                }}
            />
        );
    }
}