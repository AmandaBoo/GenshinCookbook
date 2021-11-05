import React, {useState} from 'react';
import {Icon} from "../shared/Icon";
import {InventoryManager} from "../inventory/InventoryManager";
import {NavLink} from "react-router-dom";
import Button from "../shared/buttons/Button";
import {INVENTORY_POPUP_ID} from "../../constants/constants";

const MainNavBar = ({onInventorySave, onInventoryClose, rawIngredients, craftIngredients}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    return (
        <div className={"inner-nav-bar"}>
            <NavLink className={"logo-link"} exact={true} to={"/"}>
                <img className={"logo"} src={"./images/icons/genshinCookbook.svg"} alt={"genshinCookbookLogo"}/>
            </NavLink>
            <NavLink className={"nav-bar-links"} to={"/summary"} activeClassName={"nav-bar-link-selected"}>Summary</NavLink>
            <NavLink className={"nav-bar-links"} to={"/cooking"} activeClassName={"nav-bar-link-selected"}>Cooking</NavLink>
            <NavLink className={"nav-bar-links"} to={"/potions"} activeClassName={"nav-bar-link-selected"}>Potions</NavLink>
            <NavLink className={"nav-bar-links"} to={"/smithing"} activeClassName={"nav-bar-link-selected"}>Smithing</NavLink>
            <div className={"inventory-icon"}>
                <Button
                    text={"Inventory"}
                    onClick={() => setSelectedMenu(INVENTORY_POPUP_ID)}
                />
            </div>
            <InventoryManager
                doRender={selectedMenu === INVENTORY_POPUP_ID}
                onCloseClick={() => {
                    setSelectedMenu(null);
                    onInventoryClose();
                }}
                onSaveClick={() => onInventorySave()}
                rawIngredients={rawIngredients}
                craftIngredients={craftIngredients}
            />
        </div>
    );
}

export default MainNavBar;