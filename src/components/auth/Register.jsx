import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import basicSchemaRegister from "../../schemas/basicSchemaRegister";
import supabase from "../../config/supabaseConfig";
import bcrypt from "bcryptjs";

function Register() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    // number of rounds used in the bcrypt algorithm to hash passwords
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(values.password, saltRounds);
    const hashedCoPassword = await bcrypt.hash(values.coPassword, saltRounds);

    // here initial password is compared with 'the hashed one to be sure if matches'
    const matchHashedPassword = await bcrypt.compare(
      values.password,
      hashedPassword
    );

    // here initial password is compared with 'the hashed one to be sure if matches'
    const matchHashedCoPassword = await bcrypt.compare(
      values.coPassword,
      hashedCoPassword
    );

    if (matchHashedPassword && matchHashedCoPassword) {
      //Insert user in supabse
      try {
        const { error } = await supabase.from("QuizzApp-Users").insert({
          id: uuidv4().slice(0, 4).toUpperCase(),
          firstName: values.firstName,
          secondName: values.secondName,
          email: values.email,
          password: hashedPassword,
          coPassword: hashedCoPassword,
        });
        navigate("/");

        if (error) {
          // Handle the error, you can log it or throw it if needed
          console.error("Error inserting data:", error);
          // Optionally throw the error to propagate it further
          throw error;
        }

        // The data was inserted successfully
        console.log("Data inserted successfully");
      } catch (error) {
        // Handle the error here, you can log it or perform other actions
        console.error("Error in try-catch block:", error);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      coPassword: "",
    },
    validationSchema: basicSchemaRegister,
    onSubmit,
  });
  console.log(formik.errors);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col px-5 gap-4 w-2/4 m-auto lg:w-1/4"
    >
      <h1 className="text-black text-center font-bold text-2xl dark:text-gray-200 mb-6">
        REGISTER
      </h1>
      {/* -------------------------------------- FIRST NAME ---------------------------------------- */}
      <div className="flex flex-col h-20">
        {/* <label className="text-white" htmlFor="firstName">
          First name
        </label> */}
        <input
          className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg text-black dark:text-gray-200 placeholder:gray dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          type="text"
          name="firstName"
          placeholder="Type your first name"
        ></input>
        {/* Input error message */}
        <p className="text-red-400">{formik.errors.firstName}</p>
      </div>

      {/* -------------------------------------- SECOND NAME ---------------------------------------- */}
      <div className="flex flex-col h-20">
        {/* <label className="text-white" htmlFor="secondName">
          Second name
        </label> */}
        <input
          className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg text-black dark:text-gray-200 placeholder:gray dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.secondName}
          type="text"
          name="secondName"
          placeholder="Type your second name"
        ></input>
        {/* Input error message */}
        <p className="text-red-400">{formik.errors.secondName}</p>
      </div>

      {/* ------------------------------------------ EMAIL ------------------------------------------ */}
      <div className="flex flex-col h-20">
        {/* <label className="text-white" htmlFor="email">
          Email
        </label> */}
        <input
          className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg text-black dark:text-gray-200 placeholder:gray dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          name="email"
          placeholder="Type your email"
        ></input>
        {/* Input error message */}
        <p className="text-red-400">{formik.errors.email}</p>
      </div>

      {/* ------------------------------------------ PASSWORD ---------------------------------------- */}
      <div className="flex flex-col h-20">
        {/* <label className="text-white" htmlFor="password">
          Password
        </label> */}
        <input
          className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg text-black dark:text-gray-200 placeholder:gray dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          name="password"
          placeholder="Choose a password"
        ></input>
        {/* Input error message */}
        <p className="text-red-400">{formik.errors.password}</p>
      </div>

      {/* ------------------------------------------ coPASSWORD ---------------------------------------- */}
      <div className="flex flex-col h-20">
        {/* <label className="text-white" htmlFor="coPassword">
          Confirm password
        </label> */}
        <input
          className="border-2 border-black dark:border-0 dark:bg-slate-500 px-4 py-2 text-lg text-black dark:text-gray-200 placeholder:gray dark:placeholder:text-gray-200 rounded-lg focus:outline-none"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.coPassword}
          type="password"
          name="coPassword"
          placeholder="Confirm password"
        ></input>
        {/* Input error message */}
        <p className="text-red-400">{formik.errors.coPassword}</p>
      </div>

      {/* ------------------------------------------ SUBMIT BUTTON ------------------------------------- */}
      <button className="text-lg font-bold text-black border-black bg-white dark:border-gray-400 dark:text-gray-200 dark:bg-slate-600 flex w-1/3 m-auto justify-center py-1 px-2 rounded-lg border-2 active:bg-opacity-0 transition">
        Register
      </button>
      <Link to="/">
        <div className="flex w-full justify-center items-center gap-2 mt-6">
          <p className="text-slate-300 text-center text-lg hover:underline">
            Login
          </p>
          <IoIosArrowForward color="rgb(203 213 225)" size={"17px"} />
        </div>
      </Link>
    </form>
  );
}

export default Register;
