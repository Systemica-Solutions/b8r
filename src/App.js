import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import FrontPage from "./components/FrontPage";
import AddTenant from "./components/AddTenant";
// import SuccessfulSignup from "./components/SuccessfulSignup";
import dropNav from "./components/dropNav";
import TenantPref2 from "./components/TenantAdditionFlow/TenantPref2";
import TenantSideView from "./components/TenantSideView";


// RegisterLoginUser ------------------------------------------------------
import SignUp from "./components/RegisterLoginUser/SignUp";
import EnterOTP from "./components/RegisterLoginUser/EnterOTP";
import FrontLogin from "./components/RegisterLoginUser/FrontLogin";
import VerifyPage from "./components/RegisterLoginUser/VerifyPage";
import ResetPassword from "./components/RegisterLoginUser/ResetPassword";
// _________________________________________________________________________
import TenantCreated from "./components/TenantAdditionFlow/TenantCreated";

// AgentDashBoard --------------------------------------------------
import Dashboard from "./components/Dashboard";

import My_propertyPV from "./components/AgentDashboard/My_propertyPV";
import My_PropertyYTS from "./components/AgentDashboard/My_PropertyYTS";
import My_PropertySNA from "./components/AgentDashboard/My_PropertySNA";
import My_PropertyS from "./components/AgentDashboard/My_PropertyS";
import ChangeStatus from "./components/AgentDashboard/ChangeStatus";
// _________________________________________________________________________



// AgentFlow --------------------------------------------------
import FieldAgentHomeN from "./components/FieldAgentFlow/FieldAgentHomeN";
import ConfirmOTPAgent from "./components/ConfirmOTPAgent";
import FieldAgentDetails from "./components/FieldAgentDetails";
import fieldAgentHome from "./components/fieldAgentHome";
import FieldPending from "./components/FieldPending";
import FieldAgentVerifyProperty from "./components/FieldAgentFlow/FieldAgentVerifyProperty";
import FieldAgentVerifyPropertyF from "./components/FieldAgentFlow/FieldAgentVerifyPropertyF";
import PhotosCapture from "./components/FieldAgentFlow/PhotosCapture";
import PhotoCaptureTwo from "./components/FieldAgentFlow/PhotoCaptureTwo";
import PhotoCaptureThree from "./components/FieldAgentFlow/PhotoCaptureThree";
import UploadPhotos from "./components/FieldAgentFlow/UploadPhotos";
import UploadPhotos3 from "./components/FieldAgentFlow/UploadPhotos3";
import VerificationComplete from "./components/FieldAgentFlow/VerificationComplete";

// _________________________________________________________________________


//PhotosCapture
// import PhotosCapture from "./components/FieldAgentFlow/PhotosCapture";
// import PhotoCaptureTwo from "./components/FieldAgentFlow/PhotoCaptureTwo";
// import PhotoCaptureThree from "./components/FieldAgentFlow/PhotoCaptureThree";


//PropertyCreate -Imports ---------------------------------------------------
import PropertyDetails from "./components/PropertyDetails";
import PropertyInfo from "./components/PropertyCreate/PropertyInfo";
import PropertyDI from "./components/PropertyCreate/PropertyDI";
import LandlordInfo from "./components/PropertyCreate/LandlordInfo";
// _________________________________________________________________________




import UserLoginDetails from "./components/UserLoginDetails";
import TenantDetails from "./components/TenantDetails";
import TenantAdded from "./components/TenantAdded";
import TenantPref from "./components/TenantPref";
// import UploadPhotos from "./components/FieldAgentFlow/UploadPhotos";
import UploadPhoto2 from "./components/UploadPhoto2";
// import UploadPhotos3 from "./components/FieldAgentFlow/UploadPhotos3";

import PropertyCreated from "./components/PropertyCreate/PropertyCreated";

//Field Agent


//footer
import Footer from "./components/Footer";

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

          {/* RegisterLoginUser */}
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="FrontLogin" element={<FrontLogin />} />
          <Route exact path="ResetPassword" element={<ResetPassword/>}/>
          <Route exact path="EnterOTP" element={<EnterOTP/>}/>
          <Route exact path="VerifyPage" element={<VerifyPage />} />

          <Route exact path="FieldAgentHomeN" element={<FieldAgentHomeN />} />
          <Route exact path="ConfirmOTPAgent" element={<ConfirmOTPAgent />} />
          <Route exact path="TenantCreated" element={<TenantCreated />} />
          <Route exact path="FieldAgentDetails" element={<FieldAgentDetails />} />
          <Route exact path="Dashboard" element={<Dashboard />} />
          <Route exact path="ChangeStatus" element={<ChangeStatus />} />

          <Route exact path="My_PropertyPV" element={<My_propertyPV />} />
          <Route exact path="My_PropertyYTS" element={<My_PropertyYTS />} />
          <Route exact path="My_PropertySNA" element={<My_PropertySNA />} />
          <Route exact path="My_PropertyS" element={<My_PropertyS />} />
         
          <Route exact path="FieldPending" element={<FieldPending />} />
          <Route exact path="FieldAgentVerifyProperty" element={<FieldAgentVerifyProperty />} />
          <Route exact path="FieldAgentVerifyPropertyF" element={<FieldAgentVerifyPropertyF />} />

          <Route exact path="PhotosCapture" element={<PhotosCapture />} />
          <Route exact path="PhotoCaptureTwo" element={<PhotoCaptureTwo />} />
          <Route exact path="PhotoCaptureThree" element={<PhotoCaptureThree />} />

          <Route exact path="SignUp" element={<SignUp />} />

          <Route exact path="UserLoginDetails" element={<UserLoginDetails isloggedIn={isLogin}/>} />
          <Route exact path="PropertyDetails" element={<PropertyDetails />} />
          <Route exact path="TenantDetails" element={<TenantDetails />} />
          <Route exact path="AddTenant" element={<AddTenant />} />



          {/* OTP VERIFY */}

          {/* <Route exact path="SuccesfulSignup" element={<SuccessfulSignup />} /> */}
         
          <Route exact path="PropertyInfo" element={<PropertyInfo />} />

          <Route exact path="TenantSideView" element={<TenantSideView />} />

          
          <Route exact path="LandlordInfo" element={<LandlordInfo />} />
          <Route exact path="PropertyDI" element={<PropertyDI />} />
          <Route exact path="TenantAdded" element={<TenantAdded />} />
          <Route exact path="TenantPref" element={<TenantPref />} />
          <Route exact path="UploadPhotos" element={<UploadPhotos />} />
          <Route exact path="UploadPhoto2" element={<UploadPhoto2 />} />
          <Route exact path="UploadPhotos3" element={<UploadPhotos3 />} />
          <Route exact path="dropNav" element={<dropNav />} />
          <Route exact path="PropertyCreated" element={<PropertyCreated />} />

         
          <Route exact path="TenantPref2" element={<TenantPref2 />} />

          

          <Route exact path="Footer" element={<Footer/>}/>

          <Route exact path="fieldAgentHome" element={<fieldAgentHome />} />


        </Routes>
      {/* <Footer /> */}

      </div>
    </BrowserRouter>
    
    </>
  );
}

export default App;
