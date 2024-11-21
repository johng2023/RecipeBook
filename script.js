// Initialize event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addRecipe');
    const recipesContainer = document.getElementById('recipes-container');
    
    if (!recipesContainer) {
        console.error('Recipes container not found!');
        return;
    }
    
    if (addButton) {
        addButton.addEventListener('click', addRecipe);
    }
    
    loadSavedRecipes();
});

function loadSavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    savedRecipes.forEach(recipeData => {
        createRecipe(recipeData);
    });
}

function addRecipe() {
    createRecipe();
}

function saveRecipes() {
    const recipes = [];
    document.querySelectorAll('.recipe').forEach(recipe => {
        const imgPreview = recipe.querySelector('.image-preview');
        const description = recipe.querySelector('.description');
        recipes.push({
            imageData: imgPreview.style.display !== 'none' ? imgPreview.src : null,
            description: description.value
        });
    });
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function createRecipe(savedData = null) {
    const newRecipe = document.createElement("div");
    newRecipe.className = "recipe";

    const remove = document.createElement("button");
    remove.className= "remove";
    remove.textContent = "-";
    remove.addEventListener('click', function () {
        console.log('Remove button clicked');
        // Clear the image preview
        imgPreview.src = '';
        imgPreview.style.display = 'none';
        // Remove the entire recipe container
        newRecipe.remove();
        // Update localStorage
        saveRecipes(); // Save after removing
    });
    newRecipe.appendChild(remove);

    const imgInput = document.createElement("input");
    imgInput.type = "file"
    imgInput.className = "recipe-img";
    imgInput.accept = "image/*";
    newRecipe.appendChild(imgInput);

    const imgPreview = document.createElement("img");
    imgPreview.className = "image-preview";
    imgPreview.style.display = "none";
    newRecipe.appendChild(imgPreview);

    imgInput.addEventListener('change', function(event){
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreview.src = e.target.result;
                imgPreview.style.display = "block";
                saveRecipes(); // Save after image change
            }
            reader.readAsDataURL(file);
        }
    })

    const description = document.createElement("textarea");
    description.placeholder = "Write Recipe...";
    description.className = "description";
    description.addEventListener('input', saveRecipes); // Save on text change
    newRecipe.appendChild(description);

    // If we have saved data, restore it
    if (savedData) {
        if (savedData.imageData) {
            imgPreview.src = savedData.imageData;
            imgPreview.style.display = "block";
        }
        description.value = savedData.description || '';
    }

    const container = document.getElementById('recipes-container');
    if (container) {
        container.appendChild(newRecipe);
    } else {
        console.error('Recipes container not found!');
    }
}
