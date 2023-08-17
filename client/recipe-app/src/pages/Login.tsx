import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import Authentication from "./Authentication";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]); 
const imageLogin= "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      console.log(response);

      if (response.data.userID) {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        const userID = useGetUserID();

        if (userID !== null) {
          alert("Login successful");
          navigate("/");
        } else {
          alert("Failed to set userID in local storage.");
        }
      } else {
        alert("Wrong Password or Username");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Authentication src={imageLogin}>
   <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
          />
    </Authentication>
  );
}

export default Login;
