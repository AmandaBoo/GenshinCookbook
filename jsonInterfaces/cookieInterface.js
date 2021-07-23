// file that handles interaction with the localStorage template
// and interactions with setting the localStorage

import rawIngredientsTemplate from '../jsonTemplates/localStorage/rawIngredientsTemplate.json' assert { type: "json" };
import foodIngredientsTemplate from '../jsonTemplates/localStorage/foodIngredientsTemplate.json' assert { type: "json" };
import foodRecipeTemplate from '../jsonTemplates/localStorage/foodRecipesTemplate.json' assert { type: "json" };

let localCookie = "";

export function setUpToo() {
    localStorage.rawIngredients = JSON.stringify(rawIngredientsTemplate);
    localStorage.foodIngredients = JSON.stringify(foodIngredientsTemplate);
    localStorage.foodRecipes = JSON.stringify(foodRecipeTemplate);
    console.log(localStorage.rawIngredients);
    console.log(localStorage.foodIngredients);
    console.log(localStorage.foodRecipes);
    let div = document.createElement("div");
    div.innerText = localStorage.rawIngredients;
    document.getElementById("content").append(div);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// not making assumptions about how cookies are being stored - there may be multiple in the future
export function setUpLocalStorage() {
    // set up new localStorage for document if needed
    if (document.cookie.length === 0) {
        setNewCookie();
    }
    // set up local reference to localStorage if needed
    if (localCookie === "") {
        localCookie = getCookie("cookie");
    }
}

export function getRawIngredientsFromCookie() {
    return JSON.parse(localCookie).rawIngredients;
}

export function getFoodIngredientsFromCookie() {
    return JSON.parse(localCookie).foodIngredients;
}

export function getFoodRecipesFromCookie() {
    return JSON.parse(localCookie).foodRecipes;
}