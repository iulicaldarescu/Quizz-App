import React, { useState } from "react";
import Header from "./components/Header";
import Subjects from "./components/Subjects";
import { Routes, Route } from "react-router-dom";
import darkMobile from "../public/assets/images/pattern-background-mobile-dark.svg";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import QA from "./components/QA";
import AdminLogin from "./components/auth/AdminLogin";
import AdminPage from "./components/AdminPage";
import EditSubject from "./components/EditSubject";

function App() {
  return (
    <div
      className={`bg-slate-300 dark:bg-[#313e51] w-screen h-screen bg-[url('..${darkMobile}')] py-12 overflow-auto`}
    >
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route
          path={"/home"}
          element={
            <>
              <Header />
              <Subjects />
            </>
          }
        />
        <Route path="/adminPage" element={<AdminPage />}></Route>
        {/* ---------------------------------------- DYNAMIC ROUTING -------------------------------------- */}
        <Route
          path={"/:title"}
          element={
            <>
              <Header />
              <QA />
            </>
          }
        />
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route path="/edit/:id" element={<EditSubject />}></Route>
      </Routes>
    </div>
  );
}

export default App;

// OVERALL PX-5 padding is 5-px

//INSTALED : formik, yup, supa, zustand, uuidv4

// uuidv4 was installed
// import { v4 as uuidv4 } from 'uuid';

// formik was installed
// import { Formik } from 'formik';

// YUP WAS INSTALLED
// import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

// const basicSchema = yup.object().shape({
//     name:yup.string().required("Required"),
//     email:yup.string().email('Please enter a valid email').required("Required"),
//     password : yup.string().min(5).matches(passwordRules, {message:'Please create a stronger password'}).required("Required"),
//     rePassword: yup.string().oneOf([yup.ref('password'), null], "Password must match").required("Required")
// })

// export default basicSchema;

// supabase installed
// create schemas folder and inside yupRegSchema.jsx with above content

// zustand installed
