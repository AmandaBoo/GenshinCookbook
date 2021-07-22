// file that handles interaction with the cookie template
// and interactions with setting the cookie

import cookieTemplate from "../jsonTemplates/cookie/cookieTemplate.json" assert { type: "json" };
let localCookie = "";

function setNewCookie() {
    // var expirationDate = "01 Jan 2022 00:00:00 UTC"; // TODO : FIX EXPIRATION DATE
    document.cookie = "cookie="+ JSON.stringify(cookieTemplate); /*+';expires=' + expirationDate;*/
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
export function setUpCookie() {
    // set up new cookie for document if needed
    if (document.cookie.length === 0) {
        setNewCookie();
    }
    // set up local reference to cookie if needed
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