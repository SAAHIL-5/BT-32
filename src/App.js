import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (query) fetchByCategory(query);
    else fetchBySearch('chicken');
  }, [query]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await res.json();
      setCategories(data.categories);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const fetchBySearch = async (q) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch {
      setRecipes([]);
    }
  };

  const fetchByCategory = async (cat) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch {
      setRecipes([]);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setQuery(''); // Clear selected category
      fetchBySearch(search);
      setSearch('');
    }
  };

  const onCategoryClick = (cat) => setQuery(cat);

  const getIngredients = (meal) =>
    Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`]).filter(Boolean);

  return (
    <div className="App">
      <form className="search-form" onSubmit={onSearch}>
        <input
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
        <button className="search-button" type="submit">Search</button>
      </form>

      <div className="categories">
        {categories.map((cat) => (
          <button key={cat.idCategory} className="category-button" onClick={() => onCategoryClick(cat.strCategory)}>
            {cat.strCategory}
          </button>
        ))}
      </div>

      <div className="recipes">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((meal) => (
            <Recipe
              key={meal.idMeal}
              title={meal.strMeal}
              image={meal.strMealThumb}
              ingredients={getIngredients(meal)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
