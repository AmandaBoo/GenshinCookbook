import React, {useCallback, useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import MainNavBar from "./MainNavBar";
import * as storage from "../../storageInterfaces/storageInterface";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const MainPage = () => {
    const [recipes, setRecipes] = useState(storage.getAllFoodRecipes());
    const [rawIngredients, setRawIngredients] = useState(storage.getAllRawIngredients);
    const [craftIngredients, setCraftIngredients] = useState(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));
    return (
        <div>
            <Router>
                <div className={"site-nav-bar panel"}>
                    <MainNavBar
                        onInventorySave={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
                        onInventoryClose={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
                        rawIngredients={rawIngredients}
                        craftIngredients={craftIngredients}
                    />
                </div>
                <div className={"sub-page-body"}>
                    <Switch>
                        <Route exact path={"/"}>
                            {renderSummaryPage()}
                        </Route>
                        <Route path={"/cooking"}>
                            {renderCookingPage(recipes, setRecipes, setRawIngredients, setCraftIngredients)}
                        </Route>
                        <Route path={"/potions"}>
                            {renderPotionsPage()}
                        </Route>
                        <Route path={"/smithing"}>
                            {renderSmithingPage()}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

function renderSummaryPage() {
    return (
        <div>
            Hi I'm Summary!
        </div>
    );

}

function renderCookingPage(recipes, setRecipes, setRawIngredients, setCraftIngredients) {
    return (
        <CookingPage
            recipes={recipes}
            resetStateValues={() => resetStateValues(setRecipes, setRawIngredients, setCraftIngredients)}
        />
    );
}

function renderPotionsPage() {
    return (
        <div>
            Hi I'm Potions!
        </div>
    );
}

function renderSmithingPage() {
    return (
        <div>
            Hi I'm Smithing!
        </div>
    );
}
function resetStateValues(setRecipes, setRawIngredients, setCraftIngredients) {
    setRecipes(storage.getAllFoodRecipes());
    setRawIngredients(storage.getAllRawIngredients());
    setCraftIngredients(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()))
}

export default MainPage;