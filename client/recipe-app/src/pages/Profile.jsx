import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import "./Profile.css";
function Profile() {
  const [userRecipe, setUserRecipe] = useState([]);
  const userID = useGetUserID();
  const [userRecipeID, setUserRecipeID] = useState(0)
  const [disabledRecipes, setDisabledRecipes] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/profile${userID}`
        );

        setUserRecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
  }, [userID]);

  const handleChange = (value, recipeID) => {
    setUserRecipe((userRecipe) => {
      return userRecipe.map((recipe) => {
        if (recipeID === recipe._id) {
          return { ...recipe,name: value };
        }
        return recipe;
      });
    });
  };

  const addIngredients = (recipeId) => {
    setUserRecipe((prevUserRecipe) => {
      return prevUserRecipe.map((recipe) => {
        if (recipeId === recipe._id) {
          return { ...recipe, ingredients: [...recipe.ingredients, ""] };
        }
        return recipe;
      });
    });
  };
const handleSubmit = async( id) =>{
  try{
    const updatedRecipe = userRecipe.find((recipe) => recipe._id === id);
    const response = await axios.put(
   `http://localhost:3001/recipes/editRecipe${id}`, updatedRecipe);
  console.log(response.data)
  console.log(id)
  console.log(userRecipe)
   alert('EDIT SUCCESFULLY')
  }
  catch(err){
    console.log(err)
  }
}
  const toggleEditRecipe = (recipeId) => {
    setDisabledRecipes((prevDisabledRecipes) => ({
      ...prevDisabledRecipes,
      [recipeId]: !prevDisabledRecipes[recipeId],
    }));
  };

  return (
    <div className="Profile">
      <h3>Your Recipe</h3>
      <ul>
        <form onSubmit={(e)=>e.preventDefault()}>
          {userRecipe.map((recipe, index) => {
            const isRecipeDisabled = disabledRecipes[recipe._id];
             
            return (
              <li key={recipe._id}>
                <img src={recipe.imageUrl} alt="" />
                <h4>Name</h4>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={(e) => handleChange(e.target.value,recipe._id)}
                  disabled={!isRecipeDisabled}
                />
                <h4>Ingredients</h4>
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <input
                      type="text"
                      name="ingredients"
                      defaultValue={ingredient}
                      
                      disabled={!isRecipeDisabled}
                    />
                  );
                })}
                {isRecipeDisabled && (
                  <button type="button" onClick={()=>addIngredients(recipe._id)}>
                    Add Ingredients
                  </button>
                )}
                <h4>Instructions</h4>
                <textarea
                  type="text"
                  value={recipe.instructions}
                  disabled={!isRecipeDisabled}
                />
                <h4>Cooking Time</h4>
                <input
                  type="number"
                  value={recipe.cookingTime}
                  disabled={!isRecipeDisabled}
                />
                <button
                  type="button"
                  onClick={() => toggleEditRecipe(recipe._id)}
                >
                  {isRecipeDisabled ? (
                    <span>Cancel Edit</span>
                  ) : (
                    <span>Edit</span>
                  )}
                </button>
                {isRecipeDisabled && <button type="submit" onClick={()=> handleSubmit(recipe._id)}>Save</button>}
              </li>
            );
          })}
        </form>
      </ul>
    </div>
  );
}

export default Profile;
