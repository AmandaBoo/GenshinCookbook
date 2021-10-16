import React, {useState} from 'react';
import {NavBarTab} from "../shared/NavBarTab";
import {Icon} from "../shared/Icon";
import {InventoryManager} from "../inventory/InventoryManager";

const MainNavBar = ({ids, names, setSelectedPage, selectedPage, onInventorySave, onInventoryClose, rawIngredients, craftIngredients}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    return (
        <div className={"inner-nav-bar"}>
            {renderMainNavBarLinks(selectedPage, ids, setSelectedPage, names)}
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

function renderMainNavBarLinks(selectedPage, ids, setSelectedPage, names) {
    let navBarLinks = [];
    for (let i = 0; i < ids.length; i++) {
        // TODO : FIX UNIQUE KEY PROP WARNING
        let tabId = ids[i];
        navBarLinks.push(
            <NavBarTab
                name={names[i]}
                id={tabId}
                isSelected={selectedPage === tabId}
                onClick={() => setSelectedPage(tabId)}
            />
        )
    }
    return (
        navBarLinks
    )
}

export default MainNavBar;