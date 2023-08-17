import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useCookies } from "react-cookie";
import useAuthModal from "./hooks/useAuthModal";
function NavBar() {
  const [click, setClick] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const authModal = useAuthModal()
  const navigate = useNavigate()

  const handleLogout = () =>{
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    alert("Log out Succesfully")
    navigate("/login")
  }

  const handleClick = (e) =>{
    e.preventDefault()
    if(!cookies.access_token){
      authModal.onOpen()
    }
   else{
   navigate(e.target.id)
   }
  }

  return (
    <div className="w-screen h-[4em]  p-[15px] fixed bg-[#2E8B57] text-white " >
      <ul className="items-center flex ">
        <h1 className="text-3xl text-black font-bold pr-10">Recipe Secret</h1>
        <div className="relative gap-x-[30px] hidden sm:flex md:max-w-[40%]">
          <li>
            <Link to="/" className="Link">
              Home
            </Link>
          </li>
               <li>
            <Link className="Link" onClick={(e)=>handleClick(e)} id='/create-recipe'>
              Create Recipe
            </Link>
          </li>
          <li>
            <Link id='/create-recipe' onClick={(e)=>handleClick(e)} className="Link">
              Saved Recipe
            </Link>
            </li>
            {cookies.access_token ?  
            <>
            <li>
            <Link to="/profile" className="Link">
             Profile
            </Link>
          </li>
       
            <button onClick={handleLogout}>Logout</button>
            </>
            : null }
       
        </div>
        <span className="sm:hidden"><MenuIcon  onClick={handleClick} /></span>
      </ul>
    </div>
  );
}

export default NavBar;
