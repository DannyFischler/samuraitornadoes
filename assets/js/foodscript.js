const mealSearchForm = document.getElementById("mealSearchForm");
const ingredientInput = document.getElementById("ingredient");
const mealsList = document.getElementById("mealList");
const mealDetails = document.getElementById("mealDetails");

mealSearchForm.addEventListener("submit", event => {
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
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 150px;">
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
            drinkDetails.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width: 150px;">
        <p>Category: ${drink.strCategory}</p>
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
