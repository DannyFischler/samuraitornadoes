const drinkSearchForm = document.getElementById("drinkSearchForm");
const drinkTypeInput = document.getElementById("drinkType");
const drinkList = document.getElementById("drinkList");
const drinkDetails = document.getElementById("drinkDetails");

drinkSearchForm.addEventListener("submit", event => {
    event.preventDefault();
    const drinkType = drinkTypeInput.value.trim();
    if (drinkType !== "") {
        searchDrinksByType(drinkType);
    }
});

async function searchDrinksByType(drinkType) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkType}`);
        const data = await response.json();
        const drinks = data.drinks;

        if (drinks) {
            drinkList.innerHTML = ""; // Clear the message // Clear the message{
            const randomIndex = Math.floor(Math.random() * drinks.length);
            const randomDrinkId = drinks[randomIndex].idDrink;
            fetchDrinkById(randomDrinkId);
        } else {
            drinkList.innerHTML = "<p>No drinks found.</p>";
        }
    } catch (error) {
        console.error("Error fetching drinks:", error);
        drinkList.innerHTML = "<p>Error fetching drinks.</p>";
    }
}

async function fetchDrinkById(drinkId) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        const data = await response.json();
        const drink = data.drinks[0];

        if (drink) {
            let ingredients = [];

            for (let i = 1; i <= 15; i++) { // The API has up to 15 ingredients (strIngredient1, ..., strIngredient15)
                if (drink[`strIngredient${i}`] && drink[`strIngredient${i}`].trim() !== "") {
                    ingredients.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`] || ''}`.trim());
                }
            }

            drinkDetails.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width: 300px;">
        <p>Category: ${drink.strCategory}</p>
        <p>Ingredients: ${ingredients.join(", ")}</p>
        <p>Instructions: ${drink.strInstructions}</p>
      `;
        } else {
            drinkDetails.innerHTML = "<p>Drink details not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching drink details:", error);
        drinkDetails.innerHTML = "<p>Error fetching drink details.</p>";
    }
}
