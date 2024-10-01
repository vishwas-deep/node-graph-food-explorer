import React from 'react';
import './mealDetailsSidebar.css';

const MealDetailsSidebar = ({ mealDetails, onClose }) => {
  if (!mealDetails) return null;

  const ingredientsArray = [];

  for (let i = 1; i <= 5; i++) {
    const ingredient = mealDetails[`strIngredient${i}`];
    if (ingredient) {
      ingredientsArray.push(ingredient);
    }
  }

  return (
    <div className="sidebar">
      <span className="close-btn" onClick={onClose}>X</span>

      {/* Title and Image */}
      <h2>{mealDetails.strMeal}</h2>
      <img className="meal-image" src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />

      {/* Meal Details */}
      <div className="meal-details">
        <p><strong>Category:</strong> {mealDetails.strCategory}</p>
        <p><strong>Area:</strong> {mealDetails.strArea}</p>
        <p><strong>YouTube:</strong> <a href={mealDetails.strYoutube} target="_blank" rel="noopener noreferrer">{mealDetails.strYoutube}</a></p>
        <p><strong>Recipe:</strong> <a href={mealDetails.strSource} target="_blank" rel="noopener noreferrer">{mealDetails.strSource}</a></p>
      </div>

      {/* Ingredients */}
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {ingredientsArray.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Instructions */}
      <div className="instructions-box">
        <h3>Instructions:</h3>
        <p>{mealDetails.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetailsSidebar;
