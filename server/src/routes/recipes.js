import { RecipeModel } from "../models/Recipe.js";
import mongoose from "mongoose";
import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.findById({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/profile:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const recipe = await RecipeModel.find({
      userOwner: { $in: user._id },
    })
    res.json(recipe)
  } catch (err) {
    res.json(err);
  }
});


router.put("/editRecipe:id", async (req, res) => {
  try {
    const {id} = req.params
    const recipe = req.body
    const result = await RecipeModel.findByIdAndUpdate(id, recipe, {  new: true,});
    res.json(result)
  } catch (err) {
    res.json(err);
  }
});






export { router as recipesRouter };
