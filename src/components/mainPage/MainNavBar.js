import React, {useState} from 'react';
import {NavBarTab} from "../shared/NavBarTab";
import {Icon} from "../shared/Icon";
import {InventoryManager} from "../inventory/InventoryManager";

const MainNavBar = ({ids, names, setSelectedPage, selectedPage}) => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    return (
        <div>
            {renderMainNavBarLinks(selectedPage, ids, setSelectedPage, names)}
            <Icon
                id={"inventory-icon"}
                text={"Inventory"}
                onClick={id => setSelectedMenu(id)}
            />
            <InventoryManager
                doRender={selectedMenu === "inventory-icon"}
                onCloseClick={() => setSelectedMenu(null)}
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