import React from 'react';
import './mealDetailsSidebar.css'

const MealDetailsSidebar = ({ mealDetails, onClose }) => {
  if (!mealDetails) return null;

  const ingredientsArray = [];

  for (let i = 1; i <= 5; i++) {
    const ingredient = mealDetails[`strIngredient${i}`]; // dynamically construct the property name
    if (ingredient) { // only add non-empty ingredients
      ingredientsArray.push(ingredient);
    }
  }

  return (
    <div className="sidebar">
      <span style={{cursor: 'pointer'}} onClick={onClose}>X</span>
      <h2>{mealDetails.strMeal}</h2>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {ingredientsArray.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{mealDetails.strInstructions}</p>
    </div>
  );
};

export default MealDetailsSidebar;
