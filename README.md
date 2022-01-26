# Genshin Cookbook README

### Project Overview 
[Technology](#technology)

[Hosting](#hosting)

[Data Storage and Analytics](#data-storage-and-analytics)

### Developer's Guide 
[Deploy Project Locally](#how-to-deploy-react)

[Pull Request Guide](#pull-request-guide)

[Updating Templates](#how-to-update-templates-example-given-for-food-recipes)

<a name="technology"></a>
## Technology
The site is written using Sass, and Javascript through the React framework. 

<a name="hosting"></a>
## Hosting 
The site is being served through Cloudflare as a Cloudflare page under the registered domain [genshin-cookbook.com](https://genshin-cookbook.com)

<a name="data-storage-and-analytics"></a>
## Data Storage and Analytics

### Local Storage
The core functionality of the site is not reliant on cookies, but instead, on local storage. A user's local storage keeps
track of their
- in-progress recipes
- inventory
- mora 
- settings

The first time a user hits the site, their local storage is set to the strings stored in the following files
- [rawIngredients](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js)
- [craftedIngredients](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsTemplates/craftedFoodIngredientsTemplate.js)
- [foodRecipes](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js)

Existing users receive updates to their local storage whenever they refresh the site. 
This is done by checking their current local storage against the contents of the following files. Any missing information
detected is then appended to the string stored in their local storage.
- [rawIngredients](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsonTemplates/rawIngredientsTemplate.json)
- [craftedIngredients](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsonTemplates/craftedFoodIngredientsTemplate.json)
- [foodRecipes](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/localStorageTemplates/jsonTemplates/foodRecipesTemplate.json)

Unfortunately, at this time, updating new recipes requires modifying both the .json and .js local storage files (open ticket to fix this [Issue #164](https://github.com/AmandaBoo/Project-Not-Boba/issues/164))

The local storage tracks both
### Server Storage
The majority of the site's data can be kept server-side (exm. images of recipes and ingredients, details on how each recipe is made, etc)

The files integral to this side of the storage system can be found below
- [rawIngredientsDescription](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/serverSideStorageTemplates/rawIngredientsDescription.js)
- [craftedFoodIngredientsDescription](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/serverSideStorageTemplates/craftedFoodIngredientsDescription.js)
- [foodRecipesDescription](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/serverSideStorageTemplates/foodRecipesDescription.js)
- [uiOrder](https://github.com/AmandaBoo/Project-Not-Boba/blob/master/src/storage/uiOrder.js)

Upon landing on the site, a user's local storage is scanned, updated if needed, and then used in conjunction with the server-side files to populate the UI
 and run simple calculations used in the cooking and crafting flows. 

### Analytics
Cookies are only used for the purposes of viewing basic user information through Google Analytics

<a name="how-to-deploy-react"></a>
## How to deploy React
- If pulling repo for the first time run ```npm install```
- To start up local instance run ```npm run start```

<a name="pull-request-guide"></a>
## Pull Request Guide
1. Push code up on a new branch (name your branch your ticket #)
2. Continue to push up your code to your new branch until you're ready to merge it into master
3. Make a PR when you're ready and add at least 1 reviewer
4. Resolve any comments made by reviewers
5. Once all merge checks have passed merge the branch in
6. Delete the branch
7. Close the relevant story

<a name="how-to-update-templates-example-given-for-food-recipes"></a>
## How to Update Templates (example given for Food Recipes)
- Grab relevant images and place them in public/images/foodRecipes
- Open foodRecipesTemplate.json and add new json entry by copying old entries and only changing the name
- When finished, open foodRecipesTemplate.js and replace the string in there with the contents of the foodRecipesTemplate.json
- Update the uiOrder.js with the new food entries (follow the order of the in-game UI)
- Open up the wiki for relevant new recipes as well as foodRecipesDescription.js and add new entry for each food recipe
- Test migration by refreshing screen (new recipes should appear without issues and pre-configured old recipes should still be valid)
- Test new user flow by cleaning out local storage and refreshing (new recipes should appear without issues)
