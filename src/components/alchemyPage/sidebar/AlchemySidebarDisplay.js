import React, {useState} from 'react';
import Button from "../../shared/buttons/Button";
import {RECIPES_POPUP_ID} from "../../../constants/constants";
import {RecipesContainer} from "../../cookingPage/cookbook/RecipesContainer";
import {AlchemyRecipesContainer} from "../AlchemyRecipesContainer";

export const AlchemySidebarDisplay = ({recipes, rawIngredientsDTOList, craftedIngredientsDTOList, selectedMenu, setSelectedMenu,
                                          onMiniIngredientEditSaveClick, onCraftIngredientCookSaveClick, navBarIconPath,
                                          imgSrcList, imgSrcListIds}) => {

    return (
        <div className={'sidebar-display'}>
            <div className={'add-recipe-button-div flex-center'}>
                <Button
                    classNames={'recipes-popup-button'}
                    text={'Recipes'}
                    onClick={() => setSelectedMenu(RECIPES_POPUP_ID)}
                />
            </div>
            {renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes, navBarIconPath, imgSrcList, imgSrcListIds)}

            <div className={'grocery-div'}>

            </div>
        </div>
    );
};

function renderAddRecipePopup(selectedMenu, setSelectedMenu, recipes, navBarIconPath, imgSrcList, imgSrcListIds) {
    if (selectedMenu === RECIPES_POPUP_ID) {
        return (
            <AlchemyRecipesContainer
                navBarIconPath={navBarIconPath}
                onCloseClick={() => setSelectedMenu(null)}
                foodRecipes={recipes}
                imgSrcList={imgSrcList}
                imgSrcListIds={imgSrcListIds}
            />
        );
    }
    return null;
}