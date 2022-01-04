import React, {useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import * as storage from "../../storageInterfaces/storageInterface";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {DonatePopup} from "../shared/donate/DonatePopup";
import {WIPPage} from "../WIP/WIPPage";
import {DonateIcon} from "../shared/donate/DonateIcon";
import RouteChangeTracker from "../../analytics/RouteChangeTracker";
import {MainNavBar} from "./MainNavBar";
import {HomePage} from "../homePage/HomePage";
import {FooterComponent} from "./FooterComponent";
import {CookiePopup} from "./CookiePopup";
import {AlchemyPage} from "../alchemyPage/AlchemyPage";

const MainPage = () => {
    const [recipes, setRecipes] = useState(storage.getAllFoodRecipes());
    const [alchemyRecipes, setAlchemyRecipes] = useState(storage.getAllAlchemyRecipes());
    const [rawIngredients, setRawIngredients] = useState(storage.getAllRawIngredients());
    const [craftIngredients, setCraftIngredients] = useState(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));
    const [currentPopup, setCurrentPopup] = useState("");
    const [isCookiePopupOpen, setCookiePopupStatus] = useState(false);

    return (
        <div>
            <Router>
                <div className={"site-nav-bar panel"}>
                    <MainNavBar
                        onInventorySave={() => resetAllPageStates(setRecipes, setAlchemyRecipes,setRawIngredients, setCraftIngredients)}
                        onInventoryClose={() => resetAllPageStates(setRecipes, setAlchemyRecipes,setRawIngredients, setCraftIngredients)}
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
                        <Route path={"/alchemy"}>
                            {renderAlchemyPage(alchemyRecipes, setAlchemyRecipes, setRawIngredients, setCraftIngredients)}
                        </Route>
                        <Route path={"/smithing"}>
                            {renderSmithingPage()}
                        </Route>
                    </Switch>
                </div>
                <RouteChangeTracker/>
                {renderFooter(setCookiePopupStatus)}
            </Router>
            {renderCookiePopup(isCookiePopupOpen, setCookiePopupStatus)}
            <DonateIcon onClick={() => setCurrentPopup("kofi-icon")}/>
            {renderDonatePopup(currentPopup, setCurrentPopup)}
        </div>
    );
}

function renderFooter(setCookiePopupStatus) {
    return (
        <FooterComponent
            onCookieClick={() => setCookiePopupStatus(true)}
        />
    )
}

function renderCookiePopup(isCookiePopupOpen, setCookiePopupStatus) {
    if (isCookiePopupOpen) {
        return (
            <CookiePopup
                onCloseClick={() => setCookiePopupStatus(false)}
            />
        );
    }
}

function renderHomePage() {
    return (
        <HomePage/>
    );
}

function renderSummaryPage() {
    return (
        <WIPPage/>
    );

}

function renderCookingPage(recipes, setRecipes, setRawIngredients, setCraftIngredients) {
    return (
        <CookingPage
            recipes={recipes}
            resetStateValues={() => resetCookingPageState(setRecipes, setRawIngredients, setCraftIngredients)}
        />
    );
}

function renderAlchemyPage(alchemyRecipes, setRecipes, setRawIngredients, setCraftIngredients) {
    return (
        <AlchemyPage
            alchemyRecipes={alchemyRecipes}
            resetStateValues={() => resetAlchemyPageState(setRecipes, setRawIngredients, setCraftIngredients)}
        />
    );
}

function renderSmithingPage() {
    return (
        <WIPPage/>
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

function resetAllPageStates(setCookingRecipes, setAlchemyRecipes, setRawIngredients, setCraftIngredients) {
    resetAlchemyPageState(setAlchemyRecipes, setRawIngredients, setCraftIngredients);
    resetCookingPageState(setCookingRecipes, setRawIngredients, setCraftIngredients);
}

function resetAlchemyPageState(setRecipes, setRawIngredients, setCraftIngredients) {

}

function resetCookingPageState(setRecipes, setRawIngredients, setCraftIngredients) {
    setRecipes(storage.getAllFoodRecipes());
    setRawIngredients(storage.getAllRawIngredients());
    setCraftIngredients(storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()))
}

export default MainPage;