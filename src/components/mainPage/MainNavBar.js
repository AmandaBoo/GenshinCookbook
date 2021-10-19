import React, {useState} from 'react';
import {Icon} from "../shared/Icon";
import {InventoryManager} from "../inventory/InventoryManager";
import {Link} from "react-router-dom";

const MainNavBar = ({selectedPage, onInventorySave, onInventoryClose, rawIngredients, craftIngredients}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    return (
        <div className={"inner-nav-bar"}>
            <Link
                className={
                    `nav-bar-links
                    ${selectedPage === "summaryPage" ? "nav-bar-link-selected" : "nav-bar-link-default"}`
                } to={"/"}>Summary</Link>
            <Link className="nav-bar-links nav-bar-links-default" to={"/cooking"}>Cooking</Link>
            <div className={"inventory-icon"}>
                <Icon
                    id={"inventory-icon"}
                    text={"Inventory"}
                    onClick={id => setSelectedMenu(id)}
                />
            </div>
            <InventoryManager
                doRender={selectedMenu === "inventory-icon"}
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