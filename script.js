const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const meals = ['Desayuno', 'Comida', 'Cena'];
const recipes = {
    'Desayuno': [
        'Tostadas con tomate y aceite de oliva',
        'Yogur griego con miel y nueces',
        'Tortilla española',
        'Pan integral con queso fresco y mermelada',
        'Revuelto de champiñones',
        'Fruta fresca con frutos secos',
        'Café con leche y bizcocho casero'
    ],
    'Comida': [
        'Paella valenciana',
        'Ensalada griega',
        'Pasta al pesto',
        'Pollo al limón con hierbas',
        'Pescado a la plancha con verduras',
        'Moussaka',
        'Sopa de lentejas'
    ],
    'Cena': [
        'Gazpacho',
        'Brochetas de verduras y pollo',
        'Hummus con pan pita',
        'Ensalada de tomate y mozzarella',
        'Tortilla de patatas',
        'Sopa de pescado',
        'Berenjenas rellenas'
    ]
};
const ingredients = {
    'Tostadas con tomate y aceite de oliva': {'Pan': 2, 'Tomate': 1, 'Aceite de oliva': 15},
    'Yogur griego con miel y nueces': {'Yogur griego': 200, 'Miel': 15, 'Nueces': 30},
    'Tortilla española': {'Huevos': 2, 'Patatas': 200, 'Cebolla': 50},
    'Pan integral con queso fresco y mermelada': {'Pan integral': 2, 'Queso fresco': 50, 'Mermelada': 20},
    'Revuelto de champiñones': {'Huevos': 2, 'Champiñones': 100, 'Ajo': 5},
    'Fruta fresca con frutos secos': {'Fruta variada': 200, 'Frutos secos': 30},
    'Café con leche y bizcocho casero': {'Café': 1, 'Leche': 100, 'Bizcocho': 50},
    'Paella valenciana': {'Arroz': 100, 'Pollo': 100, 'Judías verdes': 50, 'Tomate': 50, 'Azafrán': 0.1},
    'Ensalada griega': {'Tomate': 100, 'Pepino': 50, 'Queso feta': 50, 'Aceitunas': 20, 'Cebolla': 20},
    'Pasta al pesto': {'Pasta': 100, 'Albahaca': 20, 'Ajo': 5, 'Piñones': 10, 'Parmesano': 20},
    'Pollo al limón con hierbas': {'Pollo': 150, 'Limón': 1, 'Tomillo': 5, 'Ajo': 5},
    'Pescado a la plancha con verduras': {'Pescado': 150, 'Verduras variadas': 200, 'Aceite de oliva': 15},
    'Moussaka': {'Berenjenas': 200, 'Carne picada': 100, 'Tomate': 50, 'Queso': 50},
    'Sopa de lentejas': {'Lentejas': 100, 'Zanahorias': 50, 'Cebolla': 50, 'Ajo': 5},
    'Gazpacho': {'Tomate': 200, 'Pepino': 50, 'Pimiento': 50, 'Ajo': 5, 'Aceite de oliva': 15},
    'Brochetas de verduras y pollo': {'Pollo': 100, 'Verduras variadas': 150, 'Aceite de oliva': 15},
    'Hummus con pan pita': {'Garbanzos': 100, 'Tahini': 20, 'Ajo': 5, 'Limón': 1, 'Pan pita': 1},
    'Ensalada de tomate y mozzarella': {'Tomate': 100, 'Mozzarella': 100, 'Albahaca': 5, 'Aceite de oliva': 15},
    'Tortilla de patatas': {'Huevos': 2, 'Patatas': 200, 'Cebolla': 50},
    'Sopa de pescado': {'Pescado': 100, 'Zanahorias': 50, 'Cebolla': 50, 'Ajo': 5},
    'Berenjenas rellenas': {'Berenjenas': 200, 'Carne picada': 100, 'Queso': 50, 'Tomate': 50}
};

function updatePortions() {
    const portions = document.getElementById("portions").value;
    // Update the ingredient quantities according to the number of portions selected
}

function generateAndDownloadShoppingList() {
    const portions = document.getElementById("portions").value;
    let shoppingList = {};
    document.querySelectorAll('.day select').forEach((select) => {
        const selectedRecipe = select.value;
        if (selectedRecipe) {
            const recipeIngredients = ingredients[selectedRecipe];
            for (const ingredient in recipeIngredients) {
                if (!shoppingList[ingredient]) {
                    shoppingList[ingredient] = 0;
                }
                shoppingList[ingredient] += recipeIngredients[ingredient] * portions;
            }
        }
    });

    // Display shopping list
    const ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.innerHTML = '';
    for (const item in shoppingList) {
        const li = document.createElement("li");
        li.textContent = `${item}: ${shoppingList[item]}g`;
        ingredientsList.appendChild(li);
    }

    document.getElementById("shoppingList").classList.remove("hidden");

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Lista de la Compra", 20, 20);
    let yOffset = 30;
    for (const item in shoppingList) {
        doc.text(`${item}: ${shoppingList[item]}g`, 20, yOffset);
        yOffset += 10;
    }
    doc.save("lista_de_compras.pdf");
}

function generateAndDownloadMenu() {
    const menuContent = document.getElementById("menuContent");
    menuContent.innerHTML = '';

    document.querySelectorAll('.day').forEach((dayDiv, index) => {
        const day = days[index];
        const selectedMeals = dayDiv.querySelectorAll('select');
        const dayMenu = document.createElement('div');
        dayMenu.innerHTML = `<h3>${day}</h3>`;
        selectedMeals.forEach((mealSelect) => {
            const mealType = mealSelect.getAttribute('data-meal-type');
            const selectedMeal = mealSelect.value;
            if (selectedMeal) {
                dayMenu.innerHTML += `<p>${mealType}: ${selectedMeal}</p>`;
            }
        });
        menuContent.appendChild(dayMenu);
    });

    document.getElementById("weeklyMenu").classList.remove("hidden");

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Menú Semanal", 20, 20);
    let yOffset = 30;
    document.querySelectorAll("#menuContent div").forEach((dayDiv) => {
        doc.text(dayDiv.querySelector('h3').textContent, 20, yOffset);
        yOffset += 10;
        dayDiv.querySelectorAll('p').forEach((p) => {
            doc.text(p.textContent, 30, yOffset);
            yOffset += 10;
        });
        yOffset += 10;
    });
    doc.save("menu_semanal.pdf");
}

function downloadPreparationInstructions() {
    // Placeholder - generate a PDF with instructions for each recipe
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Instrucciones de Preparación", 20, 20);
    // Example content
    doc.text("Paella valenciana:", 20, 40);
    doc.text("1. Preparar los ingredientes...", 20, 50);
    doc.save("instrucciones_preparacion.pdf");
}

function populateWeekPlanner() {
    const weekPlanner = document.getElementById("weekPlanner");
    days.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        meals.forEach(meal => {
            const mealSelect = document.createElement("select");
            mealSelect.setAttribute("data-meal-type", meal);
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = `Seleccionar ${meal}`;
            mealSelect.appendChild(defaultOption);
            recipes[meal].forEach(recipe => {
                const option = document.createElement("option");
                option.value = recipe;
                option.textContent = recipe;
                mealSelect.appendChild(option);
            });
            dayDiv.appendChild(mealSelect);
        });
        weekPlanner.appendChild(dayDiv);
    });
}

window.onload = function() {
    populateWeekPlanner();
};
