import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useCookies } from "react-cookie";
import useAuthModal from "./hooks/useAuthModal";
import { FaBars, FaTimes } from "react-icons/fa";
function NavBar() {
  const [click, setClick] = useState(true);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const authModal = useAuthModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    alert("Log out Succesfully");
    navigate("/login");
    setClick((CLick) => !CLick);
  };



  const handleClick = (e) => {
    e.preventDefault();
    if (!cookies.access_token) {
      authModal.onOpen();
    } else {
      navigate(e.target.id);
    }
  };
  const handleMenu = () => {
    setClick((CLick) => !CLick);
  };
  const mobileNav = (e) => {
    const target = e.target;

    if (!cookies.access_token) {
      authModal.onOpen();
    }
    else{
    setClick((CLick) => !CLick);
    navigate(target.id);
    
    }
  };
  const mobileHome = () =>{
    setClick((CLick) => !CLick);
  navigate('/')
  }

  return (
    <div className="w-screen h-[4em]  p-[15px] fixed bg-[#2E8B57] text-white ">
      <ul className=" flex items-center ">
        <h1 className="text-3xl text-white font-bold pr-10">Recipe Secret</h1>
        <div className="relative gap-x-[30px] hidden sm:flex md:max-w-[40%] items-center font-semibold">
          <li>
            <Link to="/" className="Link">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="Link"
              onClick={(e) => handleClick(e)}
              id="/create-recipe"
            >
              Create Recipe
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => handleClick(e)}
              id="/profile"
              className="Link"
            >
              Profile
            </Link>
          </li>

          {cookies.access_token ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : null}
        </div>
        <div className="sm:hidden z-[700] relative left-[25%]">
          {click ? (
            <span className="">
              <MenuIcon onClick={handleMenu} />
            </span>
          ) : (
            <span>
              <FaTimes onClick={handleMenu} />{" "}
            </span>
          )}
        </div>
      </ul>
      <ul
        className={
          click
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen z-[600] text-white  font-semibold flex flex-col  justify-center items-center  bg-[#2E8B57] md:hidden "
        }
      >
        <li className="py-4 text-2xl" id="/" onClick={mobileHome}>
          {" "}
          Home
        </li>
        <li
          className="py-4 text-2xl"
          id="/create-recipe"
          onClick={(e) => mobileNav(e)}
        >
          {" "}
          Create Recipe
        </li>
        <li
          className="py-4 text-2xl"
          id="/profile"
          onClick={(e) => mobileNav(e)}
        >
          Profile
        </li>
        <li className="py-4 text-2xl" onClick={handleLogout}>
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
