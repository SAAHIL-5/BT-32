import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <img className={style.image} src={image} alt={title} />
      <h1>{title}</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
