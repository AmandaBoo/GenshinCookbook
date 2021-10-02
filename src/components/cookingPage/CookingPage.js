import React, {Component} from 'react';
import {Icon} from "../shared/Icon";
import {AddRecipePopup} from "./cookbook/CookbookManager";
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";

export class CookingPage extends Component {
    /* PROPS
    *
    * */
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu : null
        };
        this.recipes = storage.getAllFoodRecipes();
    }

    setSelectedMenu(menuId) {
        this.setState({selectedMenu : menuId});
    }

    getRecipeCards() {
        return this.recipes.filter(card => card.hasCard);
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
                    foodRecipes={this.recipes}
                />
                <RecipeCardDisplay
                    recipeData={this.getRecipeCards()}
                />
            </>
        )
    }
}