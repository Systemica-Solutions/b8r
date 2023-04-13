import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import FrontPage from "./components/FrontPage";
import AddTenant from "./components/AddTenant";
import FrontLogin from "./components/FrontLogin";
import SignUp from "./components/SignUp";
import VerifyPage from "./components/VerifyPage";
import SuccessfulSignup from "./components/SuccessfulSignup";
import dropNav from "./components/dropNav";

// Agent
import Dashboard from "./components/Dashboard";
import PropertyDetails from "./components/PropertyDetails";
import PropertyInfo from "./components/PropertyInfo";


import PropertyDI from "./components/PropertyDI";

import UserLoginDetails from "./components/UserLoginDetails";

import TenantDetails from "./components/TenantDetails";
import LandlordInfo from "./components/LandlordInfo";
import TenantAdded from "./components/TenantAdded";
import TenantPref from "./components/TenantPref";
import UploadPhotos from "./components/UploadPhotos";
import UploadPhoto2 from "./components/UploadPhoto2";
import UploadPhotos3 from "./components/UploadPhotos3";

function App(props) {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  console.log(username);

  useEffect(() => {
    if(!token){
      setIsLogin(false);
      console.log(isLogin);
    } else {
      setIsLogin(true);
      console.log(isLogin);
    }
  });


  return (
    <>
    <BrowserRouter>
      <div>
    <UserLoginDetails />

        <Routes>

          <Route exact path="Dashboard" element={<Dashboard />} />

          <Route exact path="FrontLogin" element={<FrontLogin />} /> ,
          <Route exact path="SignUp" element={<SignUp />} />

          <Route exact path="UserLoginDetails" element={<UserLoginDetails isloggedIn={isLogin}/>} />
          <Route exact path="PropertyDetails" element={<PropertyDetails />} />
          <Route exact path="TenantDetails" element={<TenantDetails />} />
          <Route exact path="AddTenant" element={<AddTenant />} />

          {/* OTP VERIFY */}
          <Route exact path="VerifyPage" element={<VerifyPage />} />

          <Route exact path="SuccesfulSignup" element={<SuccessfulSignup />} />
          <Route exact path="PropertyInfo" element={<PropertyInfo />} />
          <Route exact path="LandlordInfo" element={<LandlordInfo />} />
          <Route exact path="PropertyDI" element={<PropertyDI />} />
          <Route exact path="TenantAdded" element={<TenantAdded />} />
          <Route exact path="TenantPref" element={<TenantPref />} />
          <Route exact path="UploadPhotos" element={<UploadPhotos />} />
          <Route exact path="UploadPhoto2" element={<UploadPhoto2 />} />
          <Route exact path="UploadPhotos3" element={<UploadPhotos3 />} />
          <Route exact path="dropNav" element={<dropNav />} />
        </Routes>
      </div>
    </BrowserRouter>

    </>
  );
}

export default App;
