import React from "react";
import "./RecipePage.css";
import { useLocation } from "react-router-dom";

function RecipePage() {
  const location = useLocation();
  const recipe = location.state;
  return (
    <div className="RecipePage top-[20vh] relative z-[-1]">
      <div className="flex items-center justify-center relative">
        <div className="md:w-[50%] lg:flex gap-x-10 w-full sm:flex sm:flex-row">
          <div className="flex flex-col w-full">
          <img src={recipe.imageUrl} alt="" className="w-full md:w-[50vh] lg:w-auto " />
            <div className="mt-[100px] flex flex-col gap-[12px] items-center lg:items-start">
            <h3 className="bg-red-800 w-fit p-1 rounded-md font-semibold text-white">Cooking Time</h3>
            <p className="font-bold">{recipe.cookingTime} minutes</p>
            </div>
          </div>
          <div className="pl-5 flex flex-col h-full ">
            <div className="mt-5 h-full">
              <h1 className="md:text-5xl text-[#1c697a] font-bold max-w-[1000px] text-xl ">
                {recipe.name} SECRET RECIPE
              </h1>
              <p className="mt-10 bg-[#1c697a] font-semibold text-white w-fit p-1 rounded-md m-auto lg:items-start">
                Instructions:
              </p>

              <p className="mt-5 pl-5 ">{recipe.instructions}</p>
            </div>
            <div className="mt-[100px] ">
              <h3 className="bg-[#1c697a] font-semibold text-white w-fit p-1 rounded-md mb-3  m-auto lg:items-start">Ingredients:</h3>
              <div className=" bg-blue-400 rounded-lg pb-[100px]">
              {recipe.ingredients.map((ingredient) => (
                <li className="pl-5 text-white/90">{ingredient}</li>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
