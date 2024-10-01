
  // Fetch categories and update state
  export const fetchCategories = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    return data.categories.slice(0, 5);
  };

  export const fetchMealsByCategory = async (categoryLabel) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryLabel}`)
    const data = await response.json()
    return data.meals.slice(0, 5);
  }

  export const fetchIngredientsByMealId = async (mealID) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    const data = await response.json()

    return data.meals[0]
  }