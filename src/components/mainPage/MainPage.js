import React, {Component} from 'react';
import {InventoryPopup} from "../inventory/InventoryPopup";
import {Icon} from "../shared/Icon";
import {AddRecipePopup} from "../recipeCard/AddRecipePopup";

export class MainPage extends Component {
    /* PROPS
    *
    * */
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu : null
        };
    }

    setSelectedMenu(menuId) {
        this.setState({selectedMenu : menuId});
    }

    render() {
        return (
            <>
                <Icon
                    id={"inventory-icon"}
                    text={"Inventory"}
                    onClick={i => this.setSelectedMenu(i)}
                />
                <Icon
                    id={"recipe-card-icon"}
                    text={"Add Recipe Card"}
                    onClick={i => this.setSelectedMenu(i)}
                />

                <InventoryPopup
                    doRender={this.state.selectedMenu === "inventory-icon"}
                    onCloseClick={() => this.setSelectedMenu(null)}
                />
                <AddRecipePopup
                    doRender={this.state.selectedMenu === "recipe-card-icon"}
                    onCloseClick={() => this.setSelectedMenu(null)}
                />
            </>
        )
    }
}