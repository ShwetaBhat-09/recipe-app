import React, { useState, useEffect } from 'react';
import './App.css';  // Import your custom CSS file

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);  // Tracks loading state

  useEffect(() => {
    // Fetching the list of recipes from DummyJSON
    fetch('https://dummyjson.com/recipes?select=name')
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  const handleRecipeSelect = async (recipeId) => {
    setLoading(true);  // Start loading
    fetch(`https://dummyjson.com/recipes/${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRecipe(data);
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);  // Stop loading on error
      });
  };

  return (
    <div className="container">
      <header className="text-center my-5">
        <h1 className="display-4"><i className="fas fa-utensils"></i> Recipe Finder</h1>
       
      </header>

      <div className="form-group">
        <label htmlFor="recipeSelect" className="h5">Choose a Recipe:</label>
        <select
          id="recipeSelect"
          className="form-control"
          onChange={(e) => handleRecipeSelect(e.target.value)}
        >
          <option value="">Select a recipe</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show loading spinner while fetching data */}
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {selectedRecipe && !loading && (
        <div className="recipe-details card mt-5">
          <div className="card-header">
            <h3>{selectedRecipe.name}</h3>
          </div>
          <div className="card-body">
            <p><strong>Ingredients:</strong></p>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p><strong>Difficulty:</strong> {selectedRecipe.difficulty}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
