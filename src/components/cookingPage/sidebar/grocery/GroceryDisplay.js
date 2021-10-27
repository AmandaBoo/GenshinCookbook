import React, {useState} from 'react';
import GroceryItemsDisplay from "./GroceryItemsDisplay";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import {IngredientAndQtyToObtainDto} from "../../../../classes/dtos/ingredientAndQtyToObtain";
import * as Utils from "../../../../util/utils";


const GroceryDisplay = ({rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick})=> {
    const [isToggleOn, setIsToggleOn] = useState(false);
    return (
        <div className={"sidebar-card-display"}>
            {renderToggleContainer(isToggleOn, setIsToggleOn)}
            {renderGroceryList(isToggleOn, rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick)}
        </div>
    )
};

function renderGroceryList(isToggleOn, rawIngredientsDTOList, craftedIngredientsDTOList, onMiniIngredientEditSaveClick) {
    if (isToggleOn) {
        return (
            <>
                <GroceryItemsDisplay
                    topBarText={"FORAGEABLE"}
                    ingredientDTOList={findRawIngredientsForBothRawAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList)}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
                <GroceryItemsDisplay
                    topBarText={"SHOP ONLY"}
                    ingredientDTOList={findRawIngredientsForBothShopAndCrafted(rawIngredientsDTOList, craftedIngredientsDTOList)}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
                <GroceryItemsDisplay
                    topBarText={"PROCESSED"}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                    isEnabled={false}
                />
            </>
        );
    } else {
        return (
            <>
                <GroceryItemsDisplay
                    topBarText={"FORAGEABLE"}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "forage")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
                <GroceryItemsDisplay
                    topBarText={"SHOP ONLY"}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "shop")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
                />
                <GroceryItemsDisplay
                    topBarText={"PROCESSED"}
                    ingredientDTOList={filterIngredients(rawIngredientsDTOList, craftedIngredientsDTOList, "process")}
                    onMiniIngredientEditSaveClick={(ingredient, newQty) => onMiniIngredientEditSaveClick(ingredient, newQty)}
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
            rawIngredients.push(createRawIngredientBreakdown(new IngredientAndQtyToObtainDto(ingDto.ingredient, craftIng.qtyToObtain * ingDto.qtyRequired), ingDto.ingredient.craftsFrom[0]));
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
    let newIngredientsList = [];
    craftedByRaw.forEach(rawIngDTO => {
        let otherDTO = filteredOtherIngredients.find(dto => dto.ingredient.name === rawIngDTO.ingredient.name);
        if (otherDTO !== undefined) {
            newIngredientsList.push(new IngredientAndQtyToObtainDto(rawIngDTO.ingredient, otherDTO.qtyToObtain + rawIngDTO.qtyToObtain));
        } else {
            newIngredientsList.push(rawIngDTO);
        }
    });

    filteredOtherIngredients.forEach(rawIngDTO => {
        if (newIngredientsList.find(dto => dto.ingredient.name === rawIngDTO.ingredient.name) === undefined) {
            newIngredientsList.push(rawIngDTO);
        }
    });

    return newIngredientsList;
}

function renderToggleContainer(isToggleOn, setIsToggleOn) {
    return (
        <div className={"flex-center"}>
            <div className={"vertical-center"}>
                <span className={"toggle-text"}>Placeholder 1</span>
            </div>
            {renderToggle(isToggleOn, setIsToggleOn)}
            <div className={"vertical-center"}>
                <span className={"toggle-text"}>Placeholder 2</span>
            </div>
        </div>
    )
}

function renderToggle(isToggleOn, setIsToggleOn) {
    if (isToggleOn) {
        return (
            <ToggleOnIcon
                fontSize={"large"}
                onClick={() => setIsToggleOn(false)}
                className={"toggle"}
            />
        );
    } else {
        return (
            <ToggleOffIcon
                fontSize={"large"}
                onClick={() => setIsToggleOn(true)}
                className={"toggle"}
            />
        );
    }
}

export default GroceryDisplay;

