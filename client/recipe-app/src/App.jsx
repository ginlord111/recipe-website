import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import NavBar from './NavBar'
import Login from './pages/Login'
import CreateRecipe from './pages/CreateRecipe'
import SavedRecipes from './pages/SavedRecipes'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RecipePage from './pages/RecipePage'
import Profile from './pages/Profile';
import AuthModal from './pages/AuthModal'
function App() {
  return (
    <div className='App'>
<Router >
<AuthModal />
  <NavBar />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/create-recipe' element={<CreateRecipe />} />
    <Route path='/saved-recipe' element={<SavedRecipes />} />
    <Route path='/recipes' element={<RecipePage />} />
    <Route path='/profile' element={<Profile />} />
  </Routes>
</Router>


    </div>
  )
}

export default App