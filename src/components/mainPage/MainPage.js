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
                {renderPage(selectedPage, recipes)}
            </div>
        </div>
    );
}

function renderPage(selectedPage, recipes) {
    if (selectedPage === "summaryPage") {

    } else if (selectedPage === "cookingPage") {
        return (
            <CookingPage
                recipes={recipes}
            />
        );
    }
}

function resetStateValues(setRecipes) {
    setRecipes(storage.getAllFoodRecipes());
}

export default MainPage;