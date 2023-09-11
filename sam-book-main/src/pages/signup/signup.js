import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./signup-style.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
function SignupPage() {
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

  // Signup - creating a new user
  let handleClick = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
        console.log(user)
        reactLocalStorage.setObject("user", { username: email });
        navigate("/homepage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  return (
    <div className="signup-main">
      <h1>Signup Page</h1>
      <div className="signup-input">
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
          Signup
        </Button>
      </div>
    </div>
  );
}

export default SignupPage;
