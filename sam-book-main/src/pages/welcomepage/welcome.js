import React from "react";
import "./welcome-style.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  let navigate = useNavigate();

  return (
    <div className="welcome-main">
      <h1>Welcome to Sam Book Media</h1>
      <div style={{display:"flex"}}>
        <div className="button-style">
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>

        <div className="button-style">
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
