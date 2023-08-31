const searchForm = document.getElementById("searchForm");
const ingredientInput = document.getElementById("ingredient");
const mealsList = document.getElementById("mealsList");
const mealDetails = document.getElementById("mealDetails");

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();
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
            mealDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>Category: ${meal.strCategory}</p>
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
