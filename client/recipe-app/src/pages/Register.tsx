import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import Authentication from "./Authentication";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
   const response=  await axios.post("https://recipe-app-lhfe.onrender.com/auth/register", {
        username,
        password,
      });
      console.log(response)
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Authentication src='https://www.allrecipes.com/thmb/CM_3EWM9arR4CiJGcuLNG2-YmuY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8382626-eda329a79e584b34be5bf9d5db785e38.jpg'>
    <Form
             username={username}
             setUsername={setUsername}
             password={password}
             setPassword={setPassword}
             label="Register"
             onSubmit={onSubmit}
           />
     </Authentication>
  );
}

export default Register;
