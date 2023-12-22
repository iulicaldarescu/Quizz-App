import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import supabase from "../../config/supabaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt, { hash } from "bcryptjs";
import basicSchemaLogin from "../../schemas/basicSchemaLogin";

function LoginAdmin() {
  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(null);

  const onSubmit = async (values) => {
    // Fetch users from supabase
    const { data, error } = await supabase.from("QuizzApp-Admin").select();

    // check in database for a object which has email matching with user typed email
    // if yes return entire object if not returns undefined
    const adminFound = data.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (adminFound) {
      console.log("PASSWORD MATCH !!");
      setWrongCredentials(false);
      navigate("/adminPage");
    } else {
      setWrongCredentials(true);
      console.error("PASSWORD OR EMAIL DOESN'T MATCH !!");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchemaLogin,
    onSubmit,
  });

  return (
    <div className="h-full flex flex-col justify-center sm:px-10 md:px-20 lg:px-32 xl:px-56 2xl:px-96">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col px-5 gap-4 py-10"
      >
        <h1 className="text-black text-center font-bold text-2xl dark:text-gray-200 mb-6">
          LOGIN AS ADMIN
        </h1>
        {/* ------------------------------------------ EMAIL ------------------------------------------ */}
        <div className="flex flex-col h-20">
          {/* <label className="text-white" htmlFor="email">
          Email
        </label> */}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.email}
            className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg dark:text-gray-200 text-black placeholder:text-black dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
            type="email"
            name="email"
            placeholder="Type your email"
          ></input>
          <p className="text-red-400">{formik.errors.email}</p>
        </div>

        {/* ------------------------------------------ PASSWORD ---------------------------------------- */}
        <div className="flex flex-col h-20">
          {/* <label className="text-white" htmlFor="password">
          Password
        </label> */}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg dark:text-gray-200 text-black placeholder:text-black dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
            type="password"
            name="password"
            placeholder="Choose a password"
          ></input>
          <p className="text-red-400">{formik.errors.password}</p>
          {wrongCredentials && (
            <p className="text-red-400">Email or password wrong</p>
          )}
        </div>
        {/* ------------------------------------------ SUBMIT BUTTON ------------------------------------ */}

        <button
          type="submit"
          className="text-lg font-bold text-black border-black bg-white dark:border-gray-400 dark:text-gray-200 dark:bg-slate-600 flex w-1/3 m-auto justify-center py-1 px-2 rounded-lg border-2 active:bg-opacity-0 transition"
        >
          Login
        </button>
        <Link to="/">
          <div className="flex w-full justify-center items-center gap-2 mt-4">
            <p className="text-black dark:text-slate-300 text-center text-lg hover:underline">
              Back
            </p>
            <IoIosArrowForward
              color="rgb(0,0,0) dark:rgb(203 213 225)"
              size={"17px"}
            />
          </div>
        </Link>
      </form>
    </div>
  );
}

export default LoginAdmin;
