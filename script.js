document.getElementById('addRecipe').addEventListener('click', addRecipe);

function addRecipe() {
    const newRecipe = document.createElement("div");
    newRecipe.className = "recipe";

    const remove = document.createElement("button");
    remove.className= "remove";
    remove.textContent = "-";
    remove.addEventListener('click', function () {
        newRecipe.remove();
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
            }
            reader.readAsDataURL(file);
        }
    })

    const description = document.createElement("textarea");
    description.placeholder = "Write Recipe...";
    description.className = "description";
    newRecipe.appendChild(description);

    document.body.appendChild(newRecipe);
}
