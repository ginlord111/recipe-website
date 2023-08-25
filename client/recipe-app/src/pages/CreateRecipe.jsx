import React, { useEffect } from "react";
import { useState } from "react";
import "./CreateRecipe.css";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function CreateRecipe() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [userRecipe, setUserRecipe] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredients = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;

    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://recipe-app-lhfe.onrender.com/recipes", recipe);
      alert("SUCCESFULLY CREATED RECIPE");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  const noUser = () => {
    if(!cookies.access_token){
    return (
      <h3
        style={{ color: "black", position: "relative" }}
        className="create-recipe"
      >
        LOG IN FIRST BEFORE CREATING RECIPE
      </h3>
    );
    }
    return;
  };

  return (
        <div className="create-recipe z-[-1] absolute w-full  justify-center p-2">
          {noUser}
          <div className=" flex flex-col max-w-[100%] text-sm p-1 md:p-0 md:text-base">
          <h2 className="text-2xl  font-bold w-full text-center md:text-start mb-5">
            Create Your Own Recipe
          </h2>
            <img src={recipe.imageUrl} className="w-[200px] md:w-[250px] m-auto md:m-0" />
          <form action="" onSubmit={handleSubmit} className="">
          
            <label htmlFor="imageUrl">Paste Your Image URL Here</label>
            <input
            required
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
            />
            <label htmlFor="name">Recipe Title</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
              required
                value={ingredient}
                key={index}
                name="ingredients"
                type="text"
                autoFocus
                onChange={(e) => handleIngredients(e, index)}
              />
            ))}
            <button
              onClick={addIngredients}
              type="button"
              className=" bg-black  rounded-lg text-sm md:text-base text-white hover:opacity-[0.90] transition"
            >
              Add Ingredients
            </button>

            <label htmlFor="instructions">Instructions:</label>
            <textarea
            required
              name="instructions"
              id="instructions"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
            required
              type="number"
              id="cookingTime"
              name="cookingTime"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="m-auto mt-[50px] p-5 bg-green-700/90 rounded-lg w-full font-medium text-white hover:opacity-[0.90] transition truncate"
            >
              Create Recipe
            </button>
          </form>
        </div>
        </div>
     
    
  );
}

export default CreateRecipe;
