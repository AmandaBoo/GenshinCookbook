import React from 'react';

const GroceryListDisplay = ({})=> {
    return (
        <div className={"sidebar-card-display"}>
            {/*shop only*/}
            <GroceryListDisplay/>
            {/*forage only*/}
            <GroceryListDisplay/>
            {/*shop + forage*/}
            <GroceryListDisplay/>
        </div>
    )
};

export default GroceryListDisplay;

