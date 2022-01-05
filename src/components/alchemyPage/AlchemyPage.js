import React, {Component} from 'react';
import * as storage from "../../storageInterfaces/storageInterface";
import {PlaceholderPage} from "../helpGuide/PlaceholderPage";
import {ALCHEMY_PLACEHOLDER_MESSAGE, HELP_GUIDE_ID, RECIPES_POPUP_ID} from "../../constants/constants";
import SidebarDisplay from "../cookingPage/sidebar/SidebarDisplay";
import {AlchemySidebarDisplay} from "./sidebar/AlchemySidebarDisplay";

export class AlchemyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedMenu: null,
        };
    }

    render() {
        return (
            <div className={'cooking-page-display'}>
                {this.renderSidebarDisplay()}
                {this.renderRecipeDisplay()}
            </div>
        )
    }

    setSelectedMenu(id) {
        this.setState({selectedMenu: id});
        this.props.resetStateValues();
    }

    onMiniIngredientSaveClick() {

    }

    onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientUsed) {

    }

    getRecipesWithCards() {
        return storage.sortRecipesByRank(this.props.alchemyRecipes.filter(recipe => recipe.hasCard));
    }

    renderSidebarDisplay() {
        return (
            <AlchemySidebarDisplay
                recipes={this.props.alchemyRecipes}
                rawIngredientsDTOList={storage.getIngredientToObtainDTOList(this.props.alchemyRecipes, "raw")}
                selectedMenu={this.state.selectedMenu}
                setSelectedMenu={id => this.setSelectedMenu(id)}
                onMiniIngredientEditSaveClick={(ingredient, ingredientQty) => this.onMiniIngredientEditSaveClick(ingredient, ingredientQty)}
                onCraftIngredientCookSaveClick={(craftIngredientCooked, subIngredientsUsed) => this.onCraftIngredientCookSaveClick(craftIngredientCooked, subIngredientsUsed)}
                navBarIconPath={"images/iconsDisplay/alchemyIcon.png"}
                imgSrcList={["images/iconsDisplay/alchemyIcon.png"]}
                imgSrcListIds={["food-tab"]}
            />
        );
    }

    renderRecipeDisplay() {
        if (this.getRecipesWithCards().length === 0) {
            return (
                <PlaceholderPage
                    welcomeText={ALCHEMY_PLACEHOLDER_MESSAGE}
                    imgPath={'./images/iconsOriginal/albedoSitting.png'}
                    addButtonText={'Recipes'}
                    onAddButtonClick={() => this.setSelectedMenu(RECIPES_POPUP_ID)}
                    onHelpGuideButtonClick={() => this.setSelectedMenu(HELP_GUIDE_ID)}
                />
            );
        }
    }
}

// TODO : THIS PAGE MIGHT FUNCTION BETTER AS A CLASS COMPONENT
function getRecipesWithCards(alchemyRecipes) {
    return storage.sortRecipesByRank(alchemyRecipes.filter(recipe => recipe.hasCard));
}

function removeRecipeCard(recipeCard) {

}

function editRecipeCard(recipeCard) {

}

function enableDisableCard() {

}

function onCardCook(recipeCard) {

}