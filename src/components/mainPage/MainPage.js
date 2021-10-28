import React, {useCallback, useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import MainNavBar from "./MainNavBar";
import * as storage from "../../storageInterfaces/storageInterface";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {DonatePopup} from "../shared/DonatePopup";
import {KofiIcon} from "../shared/KofiIcon";
import {PotionsPage} from "../potionsPage/PotionsPage";

const MainPage = () => {
    const [recipes, setRecipes] = useState(storage.getAllFoodRecipes());
    const [rawIngredients, setRawIngredients] = useState(storage.getAllRawIngredients);
    const [craftIngredients, setCraftIngredients] = useState(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));
    const [currentPopup, setCurrentPopup] = useState("");
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
                            {renderHomePage()}
                        </Route>
                        <Route path={"/summary"}>
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
            <KofiIcon
                onClick={() => setCurrentPopup("kofi-icon")}
            />
            {renderDonatePopup(currentPopup, setCurrentPopup)}
        </div>
    );
}

function renderHomePage() {
    return (
        <PotionsPage/>
    );
}

function renderSummaryPage() {
    return (
        <PotionsPage/>
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
        <PotionsPage/>
    );
}

function renderSmithingPage() {
    return (
        <PotionsPage/>
    );
}

function renderDonatePopup(currentPopup, setCurrentPopup) {
    if (currentPopup === "kofi-icon") {
        return (
            <DonatePopup
                onCloseClick={() => setCurrentPopup("")}
            />
        );
    }
    return null;
}

function resetStateValues(setRecipes, setRawIngredients, setCraftIngredients) {
    setRecipes(storage.getAllFoodRecipes());
    setRawIngredients(storage.getAllRawIngredients());
    setCraftIngredients(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()))
}

export default MainPage;