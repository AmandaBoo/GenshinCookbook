import React, {useCallback, useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import MainNavBar from "./MainNavBar";
import * as storage from "../../storageInterfaces/storageInterface";

const MainPage = () => {
    const [selectedPage, setSelectedPage] = useState("cookingPage");
    const [recipes, setRecipes] = useState(storage.getAllFoodRecipes());
    return (
        <div>
            <div className={"site-nav-bar panel"}>
                <MainNavBar
                    ids={["summaryPage", "cookingPage"]}
                    names={["Summary", "Cooking"]}
                    setSelectedPage={() => setSelectedPage}
                    onInventorySave={() => resetStateValues(setRecipes)}
                />
            </div>
            <div className={"sub-page-body"}>
                {renderPage(selectedPage, recipes, setRecipes)}
            </div>
        </div>
    );
}

function renderPage(selectedPage, recipes, setRecipes) {
    if (selectedPage === "summaryPage") {

    } else if (selectedPage === "cookingPage") {
        return (
            <CookingPage
                recipes={recipes}
                resetStateValues={() => resetStateValues(setRecipes)}
            />
        );
    }
}

function resetStateValues(setRecipes) {
    setRecipes(storage.getAllFoodRecipes());
}

export default MainPage;