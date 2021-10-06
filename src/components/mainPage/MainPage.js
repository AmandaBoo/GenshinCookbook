import React, {useState} from 'react';
import {CookingPage} from "../cookingPage/CookingPage";
import MainNavBar from "./MainNavBar";

const MainPage = () => {
    const [selectedPage, setSelectedPage] = useState("cookingPage");
    return (
        <div>
            <div className={"site-nav-bar panel"}>
                <MainNavBar
                    ids={["summaryPage", "cookingPage"]}
                    names={["Summary", "Cooking"]}
                    setSelectedPage={() => setSelectedPage}
                />
            </div>
            <div className={"sub-page-body"}>
                {renderPage(selectedPage)}
            </div>
        </div>
    );
}

function renderPage(selectedPage) {
    if (selectedPage === "summaryPage") {

    } else if (selectedPage === "cookingPage") {
        return (<CookingPage/>);
    }
}

export default MainPage;