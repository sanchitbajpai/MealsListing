const API_URL = "https://api.freeapi.app/api/v1/public/meals";

const container = document.getElementById("meals");
const loader = document.getElementById("loader");
const skeletonLoader = document.getElementById("skeletonLoader");
const errorText = document.getElementById("error");
const searchInput = document.getElementById("searchInput");
const darkModeToggle = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");
const favoriteTab = document.getElementById("favoriteTab");
const emptyState = document.getElementById("emptyState");
const viewIndicator = document.getElementById("view-indicator");
const viewType = document.getElementById("view-type");

let allMeals = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentMealId = null;
let isViewingFavorites = false;

// ========== DARK MODE ==========
function initDarkMode() {
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcon(isDark);
}

function toggleDarkMode() {
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  }
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  themeIcon.innerText = isDark ? '☀️' : '🌙';
}

darkModeToggle.addEventListener("click", toggleDarkMode);
initDarkMode();

// ========== FAVORITES ==========
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites();
  updateFavoriteButtons();
  
  // If viewing favorites, re-render
  if (isViewingFavorites) {
    renderFavoriteMeals();
  }
}

function isFavorited(id) {
  return favorites.includes(id);
}

function updateFavoriteButtons() {
  const favedMeals = document.querySelectorAll("[data-meal-id]");
  favedMeals.forEach(meal => {
    const id = parseInt(meal.getAttribute("data-meal-id"));
    const heartBtn = meal.querySelector(".heart-btn");
    if (heartBtn) {
      heartBtn.innerText = isFavorited(id) ? "❤️" : "🤍";
    }
  });

  const modalFavBtn = document.getElementById("modalFavBtn");
  if (modalFavBtn && currentMealId) {
    modalFavBtn.innerText = isFavorited(currentMealId) ? "⭐" : "☆";
  }
}

function renderFavoriteMeals() {
  const favMeals = allMeals.filter(m => isFavorited(m.id));
  
  if (favMeals.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    viewType.innerText = "Favorite Meals (Empty)";
  } else {
    emptyState.classList.add("hidden");
    renderMeals(favMeals);
    viewType.innerText = `Favorite Meals (${favMeals.length})`;
  }
}

favoriteTab.addEventListener("click", () => {
  isViewingFavorites = !isViewingFavorites;
  searchInput.value = "";
  
  if (isViewingFavorites) {
    renderFavoriteMeals();
    favoriteTab.classList.add("ring-2", "ring-yellow-500");
  } else {
    renderMeals(allMeals);
    viewType.innerText = "All Meals";
    favoriteTab.classList.remove("ring-2", "ring-yellow-500");
    emptyState.classList.add("hidden");
  }
});

// ========== FETCH MEALS ==========
async function fetchMeals() {
  try {
    skeletonLoader.style.display = "block";
    loader.style.display = "block";

    const res = await fetch(API_URL);
    const data = await res.json();

    allMeals = data.data.data;
    renderMeals(allMeals);
    
    skeletonLoader.style.display = "none";
    loader.style.display = "none";

  } catch (err) {
    skeletonLoader.style.display = "none";
    loader.style.display = "none";
    errorText.innerText = "Failed to load meals. Please try again.";
    console.error(err);
  }
}

// ========== RENDER CARDS ==========
function renderMeals(meals) {
  if (meals.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  
  container.innerHTML = meals.map(meal => `
    <div data-meal-id="${meal.idMeal}" onclick="openModal(${meal.idMeal})"
      class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden group">

      <div class="relative overflow-hidden">
        <img src="${meal.strMealThumb}"
          class="w-full h-48 object-cover group-hover:scale-105 transition" />
        
        <button class="heart-btn absolute top-2 right-2 text-2xl bg-white dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-110 transition" 
          onclick="event.stopPropagation(); toggleFavorite(${meal.idMeal})">
          ${isFavorited(meal.idMeal) ? "❤️" : "🤍"}
        </button>
      </div>

      <div class="p-3">
        <h2 class="font-semibold text-sm dark:text-white line-clamp-1">${meal.strMeal}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400">${meal.strCategory}</p>
      </div>

    </div>
  `).join("");
}

// ========== MODAL LOGIC ==========
function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure || "as needed"}`);
    }
  }
  return ingredients;
}

function openModal(id) {
  currentMealId = id;
  const meal = allMeals.find(m => m.idMeal == id);

  document.getElementById("modalTitle").innerText = meal.strMeal;
  document.getElementById("modalCategory").innerText = `Category: ${meal.strCategory}`;
  document.getElementById("modalImg").src = meal.strMealThumb;
  document.getElementById("modalInstructions").innerText = meal.strInstructions;

  // Ingredients
  const ingredients = parseIngredients(meal);
  const ingredientsList = document.getElementById("modalIngredients");
  ingredientsList.innerHTML = ingredients.map(ing => 
    `<li class="flex items-start">
      <span class="text-blue-500 dark:text-blue-400 mr-2">✓</span>
      <span>${ing}</span>
    </li>`
  ).join("");

  // YouTube Link
  const youtubeContainer = document.getElementById("youtubeContainer");
  if (meal.strYoutube) {
    youtubeContainer.innerHTML = `
      <a href="${meal.strYoutube}" target="_blank" class="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition">
        🎥 Watch on YouTube
      </a>
    `;
  } else {
    youtubeContainer.innerHTML = "";
  }

  // Update favorite button
  updateFavoriteButtons();

  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal").classList.add("flex");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  currentMealId = null;
}

// Close modal on outside click
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
  }
});

// ========== SEARCH ==========
searchInput.addEventListener("input", () => {
  if (isViewingFavorites) return; // Don't search in favorites view
  
  const value = searchInput.value.toLowerCase();

  if (value.trim() === "") {
    renderMeals(allMeals);
    viewType.innerText = "All Meals";
  } else {
    const filtered = allMeals.filter(m =>
      m.name.toLowerCase().includes(value) ||
      m.category.toLowerCase().includes(value)
    );
    renderMeals(filtered);
    viewType.innerText = `Search Results (${filtered.length})`;
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ========== INIT ==========
fetchMeals();
