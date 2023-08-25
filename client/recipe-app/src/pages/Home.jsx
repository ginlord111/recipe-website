import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import RecipePage from "./RecipePage";
import { Link } from "react-router-dom";
import useAuthModal from "../hooks/useAuthModal";
function Home() {
  const [recipes, setRecipes] = useState([]);
  const { isOpen } = useAuthModal();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-app-lhfe.onrender.com/recipes");
        setRecipes(response.data);
        console.log("HOME", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="Home z-[-1]">
      <div className={isOpen ? "info fixed" : "info relative"}>
        <p>
          <span>
            Delight Your Taste Buds: A Whiskful Journey Through Our Delectable
            Recipes!{" "}
          </span>
          Browse Recipes, Create Recipes and Discover New Recipes
        </p>
      </div>

      <div className="recipes__container">
        <div className="grid  md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-20 ">
          {recipes.map((recipe) => (
            <Link
              to="/recipes"
              className="recipes__link "
              state={recipe}
              key={recipe._id}
            >
              <div className="list__recipes rounded-lg">
                <img fill
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="h-full rounded-lg"
                />
                <div className="contents">
                  <h3 className="font-semibold p-1">{recipe.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
