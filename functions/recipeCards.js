

export function createMainRecipeCard(recipe) {
    recipe.hasCard = true; // adds to list for save

    // setup basic card
    let recipeCard = document.createElement("div");
    recipeCard.classList.add('recipe-card');

    // add title
    let recipeTitle = document.createElement("p");
    recipeTitle.classList.add("recipe-card-title");
    recipeTitle.innerHTML = recipe.name;
    recipeCard.appendChild(recipeTitle);

    // add icon and goals section
    let metaSection = createMetaSection(recipe);
    recipeCard.appendChild(metaSection);
    createRecipeCardLine(recipeCard);

    // add ingredient section
    let subIngredientList = recipe.craftsFrom[0][1].crafted;
    if (subIngredientList.length > 0) {
        let subtitle = document.createElement("button");
        subtitle.classList.add("recipe-card-text");
        subtitle.innerHTML = "Overview <> Summary";
        subtitle.onclick = () => {toggleButton(recipe);};
        recipeCard.appendChild(subtitle);
    } else {
        let subtitle = document.createElement("p");
        subtitle.classList.add("recipe-card-text");
        subtitle.innerHTML = "Overview:";
        recipeCard.appendChild(subtitle);
    }
    let ingredientList = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    let ingredientCards = createIngredientCardList(ingredientList, recipe.rarity * 5);
    ingredientCards.id = recipe.name + '-overview';
    recipeCard.appendChild(ingredientCards);

    // create summary if needed
    recipeCard.appendChild(createSummarySection(recipe));

    // effectively the return method
    let recipeCardList = document.getElementById("recipe-cards");
    recipeCardList.append(recipeCard);
}

function toggleButton(recipe) {

    console.log('logged click');
    let summary = document.getElementById(recipe.name + '-summary');
    let overview = document.getElementById(recipe.name + '-overview');

    console.log(summary);

    if (summary.style.display === 'flex') {
        summary.style.display = 'none';
        overview.style.display = 'flex';
    } else {
        summary.style.display = 'flex';
        overview.style.display = 'none';
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

function createMetaSection(recipe) {
    let metaSection = document.createElement("div");
    metaSection.classList.add('recipe-container');

    let icon = document.createElement("img");
    icon.src = recipe.src;
    icon.classList.add('recipe-icon');
    icon.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + recipe.rarity + '_background.png")';

    let goals = document.createElement("div");
    goals.classList.add("recipe-goals");

    let masteryRatio = document.createElement("p");
    masteryRatio.classList.add("recipe-card-text");
    masteryRatio.innerHTML = 'Proficiency: ' + recipe.qty + ' / ' + recipe.rarity * 5;
    goals.appendChild(masteryRatio);

    let customRation = document.createElement("p");
    customRation.classList.add("recipe-card-text");
    customRation.innerHTML = 'Custom: ' + recipe.qty + ' / WIP';
    goals.appendChild(customRation);

    metaSection.appendChild(icon);
    metaSection.appendChild(goals);

    return metaSection;
}

function createRecipeCardLine(recipeCard) {
    let line = document.createElement("div");
    line.classList.add("recipe-card-line");
    recipeCard.appendChild(line);
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