import React, {useCallback, useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import MainNavBar from "./MainNavBar";
import * as storage from "../../storageInterfaces/storageInterface";
import {setRawIngredientsInLocalStorage} from "../../storageInterfaces/localInterface";

const MainPage = () => {
    const [selectedPage, setSelectedPage] = useState("cookingPage");
    const [recipes, setRecipes] = useState(storage.getAllFoodRecipes());
    const [rawIngredients, setRawIngredients] = useState(storage.getAllRawIngredients);
    const [craftIngredients, setCraftIngredients] = useState(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));
    return (
        <div>
            <div className={"site-nav-bar panel"}>
                <MainNavBar
                    ids={["summaryPage", "cookingPage"]}
                    names={["Summary", "Cooking"]}
                    setSelectedPage={() => setSelectedPage}
                    onInventorySave={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
                    onInventoryClose={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
                    rawIngredients={rawIngredients}
                    craftIngredients={craftIngredients}
                />
            </div>
            <div className={"sub-page-body"}>
                {renderPage(selectedPage, recipes, setRecipes, setRawIngredients, setCraftIngredients)}
            </div>
        </div>
    );
}

function renderPage(selectedPage, recipes, setRecipes, setRawIngredients, setCraftIngredients) {
    if (selectedPage === "summaryPage") {

    } else if (selectedPage === "cookingPage") {
        return (
            <CookingPage
                recipes={recipes}
                resetStateValues={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
            />
        );
    }
}

function resetStateValues(setRecipes, setRawIngredients, setCraftIngredients) {
    setRecipes(storage.getAllFoodRecipes());
    setRawIngredients(storage.getAllRawIngredients());
    setCraftIngredients(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()))
}

export default MainPage;