const mealSearchForm = document.getElementById("mealSearchForm");
const ingredientInput = document.getElementById("ingredient");
const mealsList = document.getElementById("mealList");
const mealDetails = document.getElementById("mealDetails");
const amandaItem = document.getElementById("Amanda");
const dannyItem = document.getElementById("Daniel");
const hectorItem = document.getElementById("Hector");

amandaItem.addEventListener("click", event => {
    event.preventDefault();
    fetchMealById(52830);
})

dannyItem.addEventListener("click", event => {
    event.preventDefault();
    fetchMealById(52829);
})

hectorItem.addEventListener("click", event => {
    event.preventDefault();
    fetchMealById(53013);
})

mealSearchForm.addEventListener("submit", event => {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();

    saveFoodSearchToLocalStorage(ingredient)

    if (ingredient !== "") {
        searchMealsByIngredient(ingredient);
    }
});

async function searchMealsByIngredient(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        const meals = data.meals;

        if (meals) {
            mealsList.innerHTML = ""; // Clear the message
            const randomIndex = Math.floor(Math.random() * meals.length);
            const randomMealId = meals[randomIndex].idMeal;
            fetchMealById(randomMealId);
        } else {
            mealsList.innerHTML = "<p>No meals found with this ingredient.</p>";
        }
    } catch (error) {
        console.error("Error fetching meals:", error);
        mealsList.innerHTML = "<p>Error fetching meals.</p>";
    }
}


async function fetchMealById(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];

        if (meal) {
            let ingredients = [];

            // Gather ingredients
            for (let i = 1; i <= 20; i++) {
                // The API has up to 20 ingredients (strIngredient1, ..., strIngredient20)
                if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
                    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`] || ''}`.trim());
                }
            }

            mealDetails.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 300px;">
                <p>Category: ${meal.strCategory}</p>
                <p>Ingredients: ${ingredients.join(", ")}</p>
                <p>Instructions: ${meal.strInstructions}</p>
            `;
        } else {
            mealDetails.innerHTML = "<p>Meal details not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching meal details:", error);
        mealDetails.innerHTML = "<p>Error fetching meal details.</p>";
    }
}

function getFoodSearchesFromLocalStorage() {
    const searches = localStorage.getItem('FoodHistory');
    return searches ? JSON.parse(searches) : [];
}

function saveFoodSearchToLocalStorage(ingredient) {
    const searches = getFoodSearchesFromLocalStorage();
    searches.push(ingredient);
    localStorage.setItem('FoodHistory', JSON.stringify(searches));
}
