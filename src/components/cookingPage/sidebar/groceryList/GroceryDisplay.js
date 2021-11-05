import React, {useState} from 'react';
import GroceryItemsDisplay from "./GroceryItemsDisplay";
import {IngredientAndQtyToObtainDto} from "../../../../classes/dtos/ingredientAndQtyToObtain";
import * as Utils from "../../../../util/utils";
import SettingsIcon from '@mui/icons-material/Settings';
import * as storage from "../../../../storageInterfaces/storageInterface";
import {GroceryListSettings} from "./GroceryListSettings";
import {ToggleContainer} from "../../../shared/ToggleContainer";
import {
    FORAGEABLE,
    NO_INGREDIENTS_FORAGE, NO_INGREDIENTS_PROCESS,
    NO_INGREDIENTS_SHOP,
    PROCESSED,
    SHOP_ONLY
} from "../../../../constants/constants";

const GroceryDisplay = ({rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick})=> {
    const [isToggleOn, setIsToggleOn] = useState(false);
    const [doRenderSettings, setRenderSettings] = useState(false);
    const [showCompletedIng, setShowCompletedIng] = useState(storage.doShowCompletedIngredients());

    return (
        <div className={"sidebar-card-display"}>
            {renderTopBar(setRenderSettings)}
            {renderToggleContainer(isToggleOn, setIsToggleOn)}
            {renderGroceryList(isToggleOn, rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick, showCompletedIng)}
            {renderSettingsPopup(doRenderSettings, setRenderSettings, showCompletedIng, setShowCompletedIng)}
        </div>
    )
};

function renderTopBar(setRenderSettings) {
    return (
      <div className={"top-bar header-text"}>
          <div className={"large-font"}>
            GROCERY LIST
          </div>
          <SettingsIcon
              className={"svg-icon"}
              onClick={() => setRenderSettings(true)}
          />
      </div>
    );
}

function renderGroceryList(isToggleOn, rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick, showCompletedIng) {
    if (isToggleOn) {
        return (
            <>
                <GroceryItemsDisplay
                    topBarText={FORAGEABLE}
                    ingredientDTOList={findRawIngredientsForBothRawAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList)}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    placeholderText={NO_INGREDIENTS_FORAGE}
                />
                <GroceryItemsDisplay
                    topBarText={SHOP_ONLY}
                    ingredientDTOList={findRawIngredientsForBothShopAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList)}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    placeholderText={NO_INGREDIENTS_SHOP}
                />
                <GroceryItemsDisplay
                    topBarText={PROCESSED}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    isEnabled={false}
                    placeholderText={NO_INGREDIENTS_PROCESS}
                />
            </>
        );
    } else {
        return (
            <>
                <GroceryItemsDisplay
                    topBarText={FORAGEABLE}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "forage")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    placeholderText={NO_INGREDIENTS_FORAGE}
                />
                <GroceryItemsDisplay
                    topBarText={SHOP_ONLY}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "shop")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    placeholderText={NO_INGREDIENTS_SHOP}
                />
                <GroceryItemsDisplay
                    topBarText={PROCESSED}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    showCompletedIng={showCompletedIng}
                    placeholderText={NO_INGREDIENTS_PROCESS}
                />
            </>
        );
    }
}

function filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, obtainedBy) {
    let filteredIngredientsDTOList = [];

    let filteredRawIngList = rawIngredientsDTOList.filter(dto => dto.ingredient.obtainedBy === obtainedBy);
    let filteredCraftIngList = craftedIngredientsDTOList.filter(dto => dto.ingredient.obtainedBy === obtainedBy)
    if (filteredCraftIngList.length > 0) {
        filteredIngredientsDTOList = filteredIngredientsDTOList.concat(filteredCraftIngList);
    }
    if (filteredRawIngList.length > 0) {
        filteredIngredientsDTOList = filteredIngredientsDTOList.concat(filteredRawIngList);
    }

    return filteredIngredientsDTOList;
}

function findRawIngredientsForBothRawAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList) {
    let filteredRawIngredients = filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "forage");
    let filteredCraftIngredients = filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process");

    let craftedByRaw = findRawBreakdownOfCraftedIngredients(filteredCraftIngredients, "forage");

    return mergeBreakdownLists(filteredRawIngredients, craftedByRaw);
}

function findRawIngredientsForBothShopAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList) {
    let filteredShopIngredients = filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "shop");
    let filteredCraftIngredients = filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process");

    let craftedByRaw = findRawBreakdownOfCraftedIngredients(filteredCraftIngredients, "shop");

    return mergeBreakdownLists(filteredShopIngredients, craftedByRaw);
}

function createRawIngredientBreakdown(craftIng, craftsFromList) {
    let rawIngredients = [];
    craftsFromList.forEach(ingDto => {
        if (ingDto.ingredient.obtainedBy === "process") {
            rawIngredients.push(createRawIngredientBreakdown(new IngredientAndQtyToObtainDto(ingDto.ingredient,
                craftIng.qtyToObtain * ingDto.qtyRequired), ingDto.ingredient.craftsFrom[0]));
        } else {
            rawIngredients.push(new IngredientAndQtyToObtainDto(ingDto.ingredient, craftIng.qtyToObtain * ingDto.qtyRequired));
        }
    });
    return rawIngredients;
}

function findRawBreakdownOfCraftedIngredients(filteredCraftIngredients, obtainedBy) {
    let craftedBreakdown = [];
    filteredCraftIngredients.forEach(craftIng => {
        let rawBreakdown = Utils.flatDeep(createRawIngredientBreakdown(craftIng, craftIng.ingredient.craftsFrom[0]));
        if (rawBreakdown.length > 0) {
            craftedBreakdown = craftedBreakdown.concat(rawBreakdown);
        }
    });
    return craftedBreakdown.filter(dto => dto.ingredient.obtainedBy === obtainedBy);
}

function mergeBreakdownLists(filteredOtherIngredients, craftedByRaw) {
    let newIngredientsDTOList = [];

    craftedByRaw.forEach(rawIngDTO => {
        let otherDTO = filteredOtherIngredients.find(dto => dto.ingredient.name === rawIngDTO.ingredient.name);
        let existingDTO = newIngredientsDTOList.find(dto => dto.ingredient.name === rawIngDTO.ingredient.name);

        rawIngDTO.qtyToObtain -= rawIngDTO.ingredient.qty;
        if (otherDTO !== undefined) {
            newIngredientsDTOList.push(new IngredientAndQtyToObtainDto(rawIngDTO.ingredient, otherDTO.qtyToObtain + rawIngDTO.qtyToObtain));
        } else if (existingDTO !== undefined) {
            existingDTO.qtyToObtain += rawIngDTO.qtyToObtain;
        } else {
            newIngredientsDTOList.push(rawIngDTO);
        }
    });

    filteredOtherIngredients.forEach(rawIngDTO => {
        if (newIngredientsDTOList.find(dto => dto.ingredient.name === rawIngDTO.ingredient.name) === undefined) {
            newIngredientsDTOList.push(rawIngDTO);
        }
    });

    return newIngredientsDTOList;
}

function renderToggleContainer(isToggleOn, setIsToggleOn) {
    return (
        <ToggleContainer
            title={"Show Ingredients for Processed Items"}
            isToggleOn={isToggleOn}
            setIsToggleOn={(value) => setIsToggleOn(value)}
        />
    )
}

function renderSettingsPopup(doRenderSettings, setRenderSettings, showCompletedIng, setShowCompletedIng) {
    if (doRenderSettings) {
        return (
            <GroceryListSettings
                onCloseClick={() => setRenderSettings(false)}
                onSaveClick={(value) => {
                    saveGroceryListSettings(value, showCompletedIng, setShowCompletedIng);
                    setRenderSettings(false);
                }}
            />
        )
    }
}

function saveGroceryListSettings(doShowCompletedIng, showCompletedIngState, setShowCompletedIngState) {
    if (showCompletedIngState !== doShowCompletedIng) {
        setShowCompletedIngState(doShowCompletedIng);
    }
    storage.saveDoShowCompletedIngredients(doShowCompletedIng);
}

export default GroceryDisplay;

