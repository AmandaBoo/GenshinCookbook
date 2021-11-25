### How to deploy React
- If pulling repo for the first time run ```npm install```
- To start up local instance run ```npm run start```

### Pull Request Guide
1. Push code up on a new branch (name your branch your ticket #)
2. Continue to push up your code to your new branch until you're ready to merge it into master
3. Make a PR when you're ready and add at least 1 reviewer
4. Resolve any comments made by reviewers 
6. Once all merge checks have passed merge the branch in
7. Delete the branch 
8. Close the relevant story

### Naming Guide

**Main Pages:**
- *Need one for the summary home page*
- "Cooking Manager" : Page that allows users to monitor individual food recipes 
- "Furniture Manager" : Page that allows user to monitor indvidual furniture recipes and furniture sets
- "Potions Manager" : Page that allows users to monitor individual potion recipes

**Sub Pages**
- "Inventory": Popup that maps to Genshin's material, food, and furniture inventory screens and allows for users to edit the quantities of each item within
- "Cookbook": Popup that maps to Genshin's cooking screen and allows for users to add Recipe Cards to the Cooking Manager page
- "Recipe Cards": Cards displayed in the recipe manager that aim to give users information about their progress on obtaining mastery or a custom quantity

**Priorities for 1.0**
- Help guide and placeholder text for sidebar display
- Grocery list settings
- Update WIP page styling 
- Recipe cards overhaul
- Smoother styling on button clicks and popups appearing
- Update kofi and patreon links
- Mobile styling
- Dark mode styling
- Analytics

**How to Update Templates (example given for Food Recipes)**
- Grab relevant images and place them in public/images/foodRecipes
- Open foodRecipesTemplate.json and add new json entry by copying old entries and only changing the name
- Update the uiOrder.js with the new food entries (follow the order of the in-game UI)
- When finished, open foodRecipesTemplate.js and replace the string in there with the contents of the foodRecipesTemplate.json
- Open up the wiki for relevant new recipes as well as foodRecipesDescription.js and add new entry for each food recipe
- Test migration by refreshing screen (new recipes should appear without issues and pre-configured old recipes should still be valid)
- Test new user flow by cleaning out local storage and refreshing (new recipes should appear without issues)
