import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import "./Profile.css";
function Profile() {
  const [userRecipe, setUserRecipe] = useState([]);
  const userID = useGetUserID();
  const [userRecipeID, setUserRecipeID] = useState(0)
  const [disabledRecipes, setDisabledRecipes] = useState({});
//  TRY TO POST IT SO IT CAN BE UPDATED :D

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-lhfe.onrender.com/recipes/profile${userID}`
        );
            //  `http://localhost:3001/recipes/profile${userID}`
        setUserRecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
  }, [userID])
  const handleChange = (e, recipeID) => {
    const {value, name} = e.target;
    setUserRecipe((userRecipe) => {
      return userRecipe.map((recipe) => {
        if (recipeID === recipe._id) {
          return { ...recipe,[name]: value };
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
  const handleSubmit = async (id) => {
    try {
      const updatedRecipe = userRecipe.find((recipe) => recipe._id === id);
  
      // Filter out blank ingredients before sending the recipe
   updatedRecipe.ingredients= updatedRecipe.ingredients.filter(
       (ingredient) => ingredient !== ""
      );
  
      const response = await axios.put(
        `https://recipe-app-lhfe.onrender.com/recipes/editRecipe${id}`,
        updatedRecipe
      );
      // localhost:3001/recipes/editRecipe${id}
  
      alert('EDIT SUCCESSFULLY');
      setDisabledRecipes(disable => !disable);
    } catch (err) {
      console.log(err);
    }
  };
  
  const toggleEditRecipe = (recipeId) => {
    setDisabledRecipes((prevDisabledRecipes) => ({
      ...prevDisabledRecipes,
      [recipeId]: !prevDisabledRecipes[recipeId]
    }));
  };

  const handleIngredients = (e, index, recipeId) => {
    const { value } = e.target;
  
    setUserRecipe((prevRecipe) => {
      return prevRecipe.map((recipe) => {
        if (recipeId === recipe._id) {
          return {
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient, i) =>
              i === index ? value : ingredient
            ),
          };
        }
        return recipe;
      });
    });
  };
  
  

  return (
    <div className="Profile left-0 right-0 m-0 z-[-1]">
      <h3 className="text-[#1c697a] font-semibold text-4xl mb-5">Your Recipe</h3>
      <div className="z-[1]">
      <ul>
        <form onSubmit={(e)=>e.preventDefault()} >
          {userRecipe.map((recipe, index) => {
            const isRecipeDisabled = disabledRecipes[recipe._id];
             
            return (
              <li key={recipe._id} className="z-1">
                <img src={recipe.imageUrl} alt="" className=" rounded-lg " />
                <h4 className="font-semibold text-white bg-black rounded-md px-1 hover:opacity-75 cursor-pointer">Name</h4>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={(e) => handleChange(e,recipe._id)}
                  disabled={!isRecipeDisabled}
                  className="p-1"
                />
                <h4 className="font-semibold text-white bg-black rounded-md px-1 hover:opacity-75 cursor-pointer">Ingredients:</h4>
                {recipe.ingredients.map((ingredient, index) => {
                  return (
                    <input
                      type="text"
                      name="ingredients"
                    value={ingredient}
                      onChange={(e) => handleIngredients(e, index, recipe._id)}
                      disabled={!isRecipeDisabled}
                      
                    />
                  );
                })}
                {isRecipeDisabled && (
                  <button type="button" className="p-1 bg-green-500 font-semibold rounded-lg px-3 hover:opacity-75 transition text-white" onClick={()=>addIngredients(recipe._id)}>
                    Add Ingredients
                  </button>
                )}
                <h4 className="font-semibold text-white bg-black rounded-md px-1 hover:opacity-75 cursor-pointer">Instructions</h4>
                <textarea
                  type="text"
                  value={recipe.instructions}
                  onChange={(e) => handleChange(e,recipe._id)}
                  disabled={!isRecipeDisabled}
                  className="w-[300px] p-1 rounded-md md:w-[500px] md:h-[170px] overflow-scroll"
                />
                <h4 className="font-semibold text-white bg-black rounded-md px-1 hover:opacity-75 cursor-pointer">Cooking Time</h4>
                <input
                  type="number"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={(e) => handleChange(e,recipe._id)}
                  disabled={!isRecipeDisabled}
                />
                <button
                  type="button"
                  onClick={() => toggleEditRecipe(recipe._id)}
                  className="mt-[30px]"
                >
                  {isRecipeDisabled ? (
                    <span className="bg-red-500 p-2 rounded-lg cursor-pointer font-semibold px-10 text-white">Cancel Edit</span>
                  ) : (
                    <span className="bg-green-500 p-2 rounded-lg cursor-pointer font-semibold px-10 text-gray-800">Edit</span>
                  )}
                </button >
                {isRecipeDisabled && <button type="submit" onClick={()=> handleSubmit(recipe._id)} className="bg-green-500 p-2 rounded-lg cursor-pointer font-semibold px-10 text-gray-800">Save</button>}
              </li>
            );
          })}
        </form>
        
      </ul>
      </div>
    </div>
  );
}

export default Profile;
