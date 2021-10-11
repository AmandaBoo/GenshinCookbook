# needs to be able to open foodRecipesTemplate.json
# takes in name of recipe
# modified file content to add new map
# saves to file

file = open("foodRecipesTemplate.json")
fileContents = file.read()[0:-2]
file.close()

print("Add new recipe?")
yesNo = input()
while (yesNo == "y"):
    print("Enter new recipe name")
    recipeName = input()

    recipeMap = ",\n"
    recipeMap += "{\n"
    recipeMap += "  \"name\":\"" + recipeName + "\",\n"
    recipeMap += "  \"qty\": 0,\n"
    recipeMap += "  \"want\": 0,\n"
    recipeMap += "  \"mastery\": false,\n"
    recipeMap += "  \"curProf\": 0,\n"
    recipeMap += "  \"enabled\": false,\n"
    recipeMap += "  \"rank\": 0\n"
    recipeMap += "}"

    fileContents += recipeMap

    print("Add new recipe")
    yesNo = input()

fileContents += "]"

newFile = open("temporaryTemplate.json", mode="w")
newFile.write(fileContents)
newFile.close()
print(fileContents)
