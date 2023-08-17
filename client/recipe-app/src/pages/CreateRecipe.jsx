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
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("SUCCESFULLY CREATED RECIPE");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  const noUser = () => {
    return (
      <h3
        style={{ color: "black", position: "relative" }}
        className="create-recipe"
      >
        LOG IN FIRST BEFORE CREATING RECIPE
      </h3>
    );
  };

  return (
    <>
      {!cookies.access_token ? (
        noUser()
      ) : (
        <div className="create-recipe">
          <h2 className="text-2xl  font-bold w-full text-start max-w-[25%]">
            Create Your Own Recipe
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <img src={recipe.imageUrl} />
            <label htmlFor="imageUrl">Paste Your Image URL Here</label>
            <input
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
              className="p-5 bg-black rounded-lg text-base text-white hover:opacity-[0.90] transition"
            >
              Add Ingredients
            </button>

            <label htmlFor="instructions">Instructions:</label>
            <textarea
              name="instructions"
              id="instructions"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="m-auto mt-[30px] p-5 bg-green-700/90 rounded-lg w-full font-medium text-white hover:opacity-[0.90] transition truncate"
            >
              Create Recipe
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateRecipe;
