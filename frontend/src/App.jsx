import React, { useState, useEffect } from "react";
import { createBrowserRouter, BrowserRouter, Routes,Route,  Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Signup from "./Authentictaion/Signup";
import Login from "./Authentictaion/Login";
import Profile from "./Authentictaion/Profile";

const Layout = () => (
  <>
    <Outlet />
  </>
);

export default function App() {
  const [cookies, setCookies] = useState("");

  const fetchCookies = async () => {
    const cookies = new Cookies({ path: "/" });
    let cookie_id = cookies.get("_eid");
    setCookies(cookie_id);
  };
  useEffect(() => {
    fetchCookies(); // Fetch cookies on component mount
  }, []);


  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="login" element={!cookies ? <Login /> : <Navigate to="/profile" />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
