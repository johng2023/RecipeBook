document.getElementById('addRecipe').addEventListener('click', addRecipe);

function addRecipe() {
    const newRecipe = document.createElement("div");
    newRecipe.className = "recipe";

    const remove = document.createElement("button");
    remove.id = "remove";
    remove.textContent = "-";
    remove.addEventListener('click', function () {
        newRecipe.remove();
    });
    newRecipe.appendChild(remove);

    const imgInput = document.createElement("input");
    imgInput.type = "file"
    imgInput.className = "recipe-img";
    newRecipe.appendChild(imgInput);

    const description = document.createElement("textarea");
    description.placeholder = "Write Recipe...";
    description.className = "description";
    newRecipe.appendChild(description);

    document.body.appendChild(newRecipe);
}