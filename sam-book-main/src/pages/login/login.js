import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./login-style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function LoginPage() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let navigate = useNavigate();

  let handleInput = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  // login - creating a new user
  let handleClick = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
        console.log(user)
        // Store the user data in the local storage(browser)
        reactLocalStorage.setObject("user", { username: email });

        // Navigate to the homepage
        navigate("/homepage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  return (
    <div className="login-main">
      <h1>Login Page</h1>
      <div className="login-input">
        <TextField
          placeholder="email"
          type={"email"}
          name="email"
          onChange={handleInput}
          style={{ margin: "1rem", width: "300px" }}
        />
        <TextField
          placeholder="password"
          type={"password"}
          name="password"
          onChange={handleInput}
          style={{ margin: "1rem", width: "300px" }}
        />
      </div>
      <div className="button-style">
        <Button variant="contained" onClick={handleClick}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
