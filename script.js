const createBtn = document.querySelector(".createBtn");
const addIng = document.querySelector(".addBtn");
const remIng = document.querySelector(".remBtn");
const recipeForm = document.querySelector(".recipe-form");
const ingredientList = document.querySelector(".ingredient-list");
const cardContainer = document.querySelector(".row");

function clearData() {
  // Clear the title and instructions fields
  document.querySelector("#title").value = "";
  document.querySelector("#instructions").value = "";

  // Clear all ingredient inputs
  const ingredients = document.querySelectorAll(".ingredient");
  ingredients.forEach((input) => {
    input.value = "";
  });
}

function addIngredient() {
  // Create a new ingredient input field
  const ingredient = document.createElement("input");
  ingredient.type = "text";
  ingredient.className = "form-control m-2 w-75 ingredient";
  ingredient.placeholder = "Enter Ingredient";

  // Append the new ingredient input to the ingredient list
  ingredientList.appendChild(ingredient);
}

function removeIngredient() {
  // Remove the last ingredient input field
  const lastIngredient = ingredientList.lastElementChild;
  if (lastIngredient) {
    lastIngredient.remove();
  }
}

function createRecipe(e) {
  e.preventDefault(); // Prevent form submission
  const recipeTitle = document.querySelector("#title").value;
  const instructions = document.querySelector("#instructions").value;

  // Collect all ingredients into an array
  const ingredients = Array.from(document.querySelectorAll(".ingredient"))
    .map((input) => input.value.trim())
    .filter((value) => value !== ""); // Filter out empty values

  // Create a recipe object
  const recipe = {
    title: recipeTitle,
    instructions: instructions,
    ingredients: ingredients,
  };

  // Save the recipe and clear the form
  saveRecipe(recipe);
  clearData();
}

function saveRecipe(recipe) {
  // Create a card for the recipe and append it to the card container
  const card = document.createElement("div");
  card.className = "col";
  card.innerHTML = `
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${recipe.title}</h5>
        <p class="card-text">${recipe.instructions}</p>
      </div>
      <ul class="list-group list-group-flush">
        ${recipe.ingredients
          .map((ingredient) => `<li class='list-group-item'>${ingredient}</li>`)
          .join("")}
      </ul>
      <div class="card-body">
        <button type="button" class="btn btn-danger delete">Delete</button>
      </div>
    </div>`;

  document.querySelector(".row").appendChild(card);
  saveData(); // Save the current state to local storage
}

function saveData() {
  // Save the current card container's HTML to local storage
  localStorage.setItem("data", cardContainer.innerHTML);
}

function showData() {
  // Load the saved data from local storage
  cardContainer.innerHTML = localStorage.getItem("data") || "";
}

function resetAll() {
  // Clear all recipes from local storage and the display
  localStorage.clear();
  cardContainer.innerHTML = "";
}

// Event Listeners
addIng.addEventListener("click", addIngredient);
remIng.addEventListener("click", removeIngredient);
recipeForm.addEventListener("submit", createRecipe);
cardContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".col").remove();
    saveData(); // Update local storage after deletion
  }
});

// Clear all recipes when the clear-all button is clicked
document.getElementById("clear-all").addEventListener("click", resetAll);

showData(); // Show saved recipes on page load
