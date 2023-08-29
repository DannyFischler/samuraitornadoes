const generateBtn = document.getElementById("generateBtn");
const mealName = document.getElementById("mealName");
const mealImage = document.getElementById("mealImage");
const mealCategory = document.getElementById("mealCategory");
const mealInstructions = document.getElementById("mealInstructions");
const mealInfo = document.getElementById("mealInfo");

generateBtn.addEventListener("click", () => {
    fetchRandomMeal();
});

async function fetchRandomMeal() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const meal = data.meals[0];

        mealName.textContent = meal.strMeal;
        mealImage.src = meal.strMealThumb;
        mealCategory.textContent = `Category: ${meal.strCategory}`;
        mealInstructions.textContent = `Instructions: ${meal.strInstructions}`;

        mealInfo.style.display = "block";
    } catch (error) {
        console.error("Error fetching random meal:", error);
        mealInfo.style.display = "none";
    }
}
