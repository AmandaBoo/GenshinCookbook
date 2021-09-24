import React, {Component} from 'react';
import {Icon} from "../shared/Icon";
import {AddRecipePopup} from "./cookbook/CookbookManager";

export class CookingPage extends Component {
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
                    id={"recipe-card-icon"}
                    text={"Add Recipe Card"}
                    onClick={i => this.setSelectedMenu(i)}
                />
                <AddRecipePopup
                    doRender={this.state.selectedMenu === "recipe-card-icon"}
                    onCloseClick={() => this.setSelectedMenu(null)}
                />
            </>
        )
    }
}