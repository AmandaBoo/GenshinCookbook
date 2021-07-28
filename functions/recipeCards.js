

export function createMainRecipeCard(recipe) {
    recipe.hasCard = true; // adds to list for save

    // setup basic card
    let recipeCard = document.createElement("div");
    recipeCard.classList.add('recipe-card');

    // // add title
    // let recipeTitle = document.createElement("p");
    // recipeTitle.classList.add("recipe-card-title");
    // recipeTitle.innerHTML = recipe.name;
    // recipeCard.appendChild(recipeTitle);

    // add icon and goals section
    let frontSide = createCardBody(recipe);
    recipeCard.appendChild(frontSide);

    // // add ingredient section
    // let subIngredientList = recipe.craftsFrom[0][1].crafted;
    // if (subIngredientList.length > 0) {
    //     let subtitle = createToggleButton(recipe);
    //     recipeCard.appendChild(subtitle);
    // } else {
    //     let subtitle = document.createElement("p");
    //     subtitle.classList.add("recipe-card-text");
    //     subtitle.innerHTML = "Overview:";
    //     recipeCard.appendChild(subtitle);
    // }
    // let ingredientList = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    // let ingredientCards = createIngredientCardList(ingredientList, recipe.rarity * 5);
    // ingredientCards.id = recipe.name + '-overview';
    // recipeCard.appendChild(ingredientCards);
    //
    // // create summary if needed
    // recipeCard.appendChild(createSummarySection(recipe));

    // effectively the return method
    let recipeCardList = document.getElementById("recipe-cards");
    recipeCardList.appendChild(recipeCard);
}

function createToggleButton(recipe) {
    let btn = document.createElement("button");
    btn.classList.add("recipe-card-text");

    let overview = document.createElement("span");
    overview.innerHTML = "Overview <";
    overview.id = recipe.name + '-btn-overview';
    let summary = document.createElement("span");
    summary.innerHTML = "> Summary";
    summary.id = recipe.name + '-btn-summary';
    summary.classList.add('disabled');

    btn.appendChild(overview);
    btn.appendChild(summary);

    btn.onclick = () => {toggleButton(recipe);};

    return btn;
}

function toggleButton(recipe) {

    console.log('logged click');
    let summary = document.getElementById(recipe.name + '-summary');
    let overview = document.getElementById(recipe.name + '-overview');
    let summaryBtn = document.getElementById(recipe.name + '-btn-summary');
    let overviewBtn = document.getElementById(recipe.name + '-btn-overview');

    console.log(summary);

    if (summary.style.display === 'flex') {
        summary.style.display = 'none';
        overview.style.display = 'flex';
        summaryBtn.classList.add('disabled');
        overviewBtn.classList.remove('disabled');
    } else {
        summary.style.display = 'flex';
        overview.style.display = 'none';
        summaryBtn.classList.remove('disabled');
        overviewBtn.classList.add('disabled');
    }
}

function createSummarySection(recipe) {
    let summaryCards = document.createElement("div");

    let subIngredientList = recipe.craftsFrom[0][1].crafted;
    if (subIngredientList.length > 0) {

        summaryCards = createSubIngredientCardList(subIngredientList, recipe.rarity * 5);

        let ingredientCards = createIngredientCardList(recipe.craftsFrom[0][0].raw, recipe.rarity * 5);
        summaryCards.innerHTML = ingredientCards.innerHTML + summaryCards.innerHTML;
    }

    summaryCards.id = recipe.name + '-summary';
    summaryCards.style.display = 'none';
    return summaryCards;
}

function createCardBody(recipe) {
    let infoSection = document.createElement("div");
    infoSection.classList.add('recipe-container');

    let icon = document.createElement("img");
    icon.src = recipe.src;
    icon.classList.add('recipe-icon');
    icon.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + recipe.rarity + '_background.png")';

    let middleSection = document.createElement("div");
    middleSection.classList.add("recipe-goals");

    let title = document.createElement("p");
    title.classList.add("recipe-card-text");
    title.innerHTML = recipe.name;
    middleSection.appendChild(title);

    let progressBar = createProgressBar(recipe);
    middleSection.appendChild(progressBar);

    infoSection.appendChild(icon);
    infoSection.appendChild(middleSection);

    return infoSection;
}

function createProgressBar (recipe) {
    // set up
    let bar = document.createElement("div");
    bar.classList.add('progress-bar');
    let color = document.createElement("div");
    color.classList.add('progress-bar-progress');
    bar.appendChild(color);

    // calculate percentage
    let totalNeeded = 0;
    let totalPlayerHas = 0;

    let list = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    list.forEach(ingredient => {
        let needed = ingredient.qtyRequired * recipe.rarity * 5;
        totalNeeded += needed;

        let has = ingredient.ingredient.qty;
        totalPlayerHas += has > needed ? needed : has;
        console.log(ingredient);

    });

    // color.style.width = (100 * totalPlayerHas / totalNeeded) + '%';
    color.style.width = (100 * Math.random()) + '%';


    return bar;
}

function createIngredientCardList(list, sumToMake) {
    let cardList = document.createElement("div");
    cardList.classList.add('cards');

    list.forEach(ingredient => {
        cardList.appendChild(createIngredientCard(ingredient.ingredient, ingredient.qtyRequired * sumToMake));
    });

    return cardList;
}

function createSubIngredientCardList(list, sumToMake) {
    let cardList = document.createElement("div");
    cardList.classList.add('cards');

    list.forEach(ingredient => { // ingredient is the crafted ingredient and qty
        let newSumToMake = ingredient.qtyRequired * sumToMake;
        ingredient.ingredient.craftsFrom[0].forEach(subIngredient => {
            cardList.appendChild(createIngredientCard(subIngredient.ingredient, subIngredient.qtyRequired * newSumToMake));
        });
    });

    return cardList;
}

function createIngredientCard (ingredient, total) {
    let content = document.createElement("img");
    content.classList += "card-icon";
    content.src = ingredient.src;
    content.alt = ingredient.name;

    let textField = document.createElement("p");
    textField.innerHTML = ingredient.qty + "/" + total;
    textField.oninput = function() { ingredient.qty = textField.value }; // TODO : PREVENT E AND . FROM BEING INPUTTED
    textField.onchange = function() { resetFieldIfBlank(ingredient, textField) };

    let card = document.createElement("div");
    card.id = ingredient.name;
    card.classList.add('recipe-card-ingredient-card');
    card.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + ingredient.rarity + '_background.png")';
    card.append(content);
    card.append(textField);

    return card;
}