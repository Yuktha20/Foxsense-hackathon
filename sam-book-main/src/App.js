import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import WelcomePage from "./pages/welcomepage/welcome";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<WelcomePage />} />
      <Route path={"/signup"} element={<SignupPage />}></Route>
      <Route path={"/login"} element={<LoginPage />}></Route>
      <Route path={"/homepage"} element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
