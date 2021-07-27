

export function createMainRecipeCard(recipe) {
    recipe.hasCard = true;

    // setup basic card
    let recipeCard = document.createElement("div");
    recipeCard.classList.add('recipe-card');

    // add title
    let recipeTitle = document.createElement("p");
    recipeTitle.classList.add("recipe-card-title");
    recipeTitle.innerHTML = recipe.name;
    recipeCard.appendChild(recipeTitle);

    // add goals section
    let neededForMastery = recipe.rarity * 5;
    let masteryRatio = document.createElement("p");
    masteryRatio.classList.add("recipe-card-text");
    masteryRatio.innerHTML = 'Proficiency: 0/' + neededForMastery;
    recipeCard.appendChild(masteryRatio);

    createRecipeCardLine(recipeCard);

    // add ingredient section
    let subtitle = document.createElement("p");
    subtitle.classList.add("recipe-card-text");
    subtitle.innerHTML = "Ingredients";
    recipeCard.appendChild(subtitle);
    let ingredientList = recipe.craftsFrom[0][0].raw.concat(recipe.craftsFrom[0][1].crafted);
    ingredientList = ingredientList.map(ingredient => ingredient.ingredient); // TODO use the qty as well for cards
    let ingredientCards = createIngredientCardList(ingredientList);

    recipeCard.appendChild(ingredientCards);

    createRecipeCardLine(recipeCard);

    // add sub-ingredient section
    let subsubtitle = document.createElement("p");
    subsubtitle.classList.add("recipe-card-text");
    subsubtitle.innerHTML = "Sub Ingredient";
    recipeCard.appendChild(subsubtitle);
    let subIngredientList = recipe.craftsFrom[0][1].crafted;
    subIngredientList = subIngredientList.map(ingredient => ingredient.ingredient.craftsFrom);

    let temp = [];
    subIngredientList.forEach(i => temp = temp.concat(i[0]));
    subIngredientList = temp;

    subIngredientList = subIngredientList.map(ingredient => ingredient.ingredient); // TODO use the qty as well for cards
    console.log(subIngredientList);
    let subIngredientCards = createIngredientCardList(subIngredientList);

    recipeCard.appendChild(subIngredientCards);

    // effectively the return method
    let recipeCardList = document.getElementById("recipe-cards");
    recipeCardList.append(recipeCard);
}

function createRecipeCardLine(recipeCard) {
    let line = document.createElement("div");
    line.classList.add("recipe-card-line");
    recipeCard.appendChild(line);
}

function createIngredientCardList(list) {
    let cardList = document.createElement("div");
    cardList.classList.add('cards');

    list.forEach(ingredient => {
        cardList.append(createIngredientCard(ingredient));
    });

    return cardList;
}

function createIngredientCard (ingredient) {
    let content = document.createElement("img");
    content.classList += "card-icon";
    content.src = ingredient.src;
    content.alt = ingredient.name;

    let textField = document.createElement("input");
    textField.classList += "card-text-field";
    textField.type = "number";
    textField.value = ingredient.qty;
    textField.oninput = function() { ingredient.qty = textField.value }; // TODO : PREVENT E AND . FROM BEING INPUTTED
    textField.onchange = function() { resetFieldIfBlank(ingredient, textField) };

    let card = document.createElement("div");
    card.id = ingredient.name;
    card.classList.add('ingredient-card');
    card.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + ingredient.rarity + '_background.png")';
    card.append(content);
    card.append(textField);

    return card;
}