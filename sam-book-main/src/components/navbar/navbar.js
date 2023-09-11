import { Button } from "@mui/material";
import React from "react";
import "./navbar-style.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function Navbar() {
  let navigte = useNavigate();

//   Signout firebase function
  let handleClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigte("/");
        reactLocalStorage.remove('user')
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="navbar-main">
      <h2>Sam Book Media</h2>
      <Button color="error" variant="contained" onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
}
export default Navbar;
