import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import supabase from "../config/supabaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function Subjects() {
  const [quizArray, setQuizArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchSupa = async () => {
      try {
        const { data, error } = await supabase.from("QuizzApp-Quizz").select();
        setQuizArray(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupa();
    console.log(quizArray);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "",
      question: "",
      answer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      questions: [],
    },
  });

  const addQuestion = () => {
    const newQuestion = {
      question: formik.values.question,
      answer: formik.values.answer,
      options: [
        formik.values.option1,
        formik.values.option2,
        formik.values.option3,
        formik.values.option4,
      ],
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

    formik.setFieldValue("question", "");
    formik.setFieldValue("answer", "");
    formik.setFieldValue("option1", "");
    formik.setFieldValue("option2", "");
    formik.setFieldValue("option3", "");
    formik.setFieldValue("option4", "");
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      questions: questions,
    });
  }, [questions]);

  const submitAllData = async () => {
    const { error } = await supabase.from("QuizzApp-Quizz").insert({
      title: formik.values.title,
      icon: formik.values.icon,
      questions: formik.values.questions,
    });

    formik.resetForm();
  };

  // DELETE SUBJECT FUNCTION
  const deleteSubject = async (id) => {
    const { error } = await supabase
      .from("QuizzApp-Quizz")
      .delete()
      .eq("id", id);
  };

  return (
    <div className="px-5 flex flex-col gap-5 sm:px-10 md:px-20 lg:px-[200px] xl:px-[300px] 2xl:px-[500px]">
      <div className="flex gap-5 px-3 bg-white text-black dark:bg-[#3c4d67] py-2 items-center dark:text-white font-bold rounded-xl">
        <div className=" rounded-lg">
          <FaCirclePlus
            color=" rgb(34 197 94 / var(--tw-bg-opacity)"
            size={"50px"}
          />
        </div>
        <p className="text-lg">Add new subject</p>
      </div>

      {/* Add subject form */}

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <input
          className="px-4 py-2 rounded-xl focus:outline-none"
          type="text"
          placeholder="Subject title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        ></input>
        {/* Icon */}
        <input
          className="px-4 py-2 rounded-xl focus:outline-none"
          type="text"
          placeholder="Icon"
          name="icon"
          onChange={formik.handleChange}
          value={formik.values.icon}
        ></input>

        <div className="flex flex-col gap-5">
          <input
            className="px-4 py-2 rounded-xl focus:outline-none"
            type="text"
            placeholder="Question"
            name="question"
            onChange={formik.handleChange}
            value={formik.values.question}
          ></input>
          <input
            className="px-4 py-2 rounded-xl focus:outline-none"
            type="text"
            placeholder="Answer"
            name="answer"
            onChange={formik.handleChange}
            value={formik.values.answer}
          ></input>

          {/* options inputs */}
          <div className="w-full flex flex-col gap-5">
            <input
              className="px-4 py-2 rounded-xl focus:outline-none"
              name="option1"
              type="text"
              placeholder="Option 1"
              onChange={formik.handleChange}
              value={formik.values.option1}
            ></input>

            <input
              className="px-4 py-2 rounded-xl focus:outline-none"
              name="option2"
              type="text"
              placeholder="Option 2"
              onChange={formik.handleChange}
              value={formik.values.option2}
            ></input>

            <input
              className="px-4 py-2 rounded-xl focus:outline-none"
              name="option3"
              type="text"
              placeholder="Option 3"
              onChange={formik.handleChange}
              value={formik.values.option3}
            ></input>

            <input
              className="px-4 py-2 rounded-xl focus:outline-none"
              name="option4"
              type="text"
              placeholder="Option 4"
              onChange={formik.handleChange}
              value={formik.values.option4}
            ></input>
          </div>
        </div>

        {/* add questions and submit buttons div */}
        <p className="text-center text-lg font-bold text-white">
          Questions : {questions.length}
        </p>

        <div className="flex justify-between mt-5 md:px-[25%]">
          {/* ADD QUESTION */}
          <button
            className="bg-green-500 rounded-xl font-bold text-[#313e51] w-36 py-2"
            type="button"
            onClick={addQuestion}
          >
            Add question
          </button>

          {/* SUBMIT */}
          <button
            className="rounded-xl font-bold text-green-700 border-green-700 dark:text-green-500 w-36 py-2 border-2 dark:border-green-500"
            type="button"
            onClick={submitAllData}
          >
            Submit all data
          </button>
        </div>
      </form>

      {/* end of form. building the delete function */}
      <div className="flex flex-col gap-2">
        {quizArray.map((quizz) => {
          return (
            <div className="flex justify-between md:px-[25%]">
              <Link to={`/edit/${quizz.id}`}>
                <p className="border-2 border-black dark:border-white text-black dark:text-white w-36 rounded-xl text-center">
                  {quizz.title}
                </p>
              </Link>
              <button
                onClick={() => deleteSubject(quizz.id)}
                className="bg-rose-600 rounded-xl text-white px-3"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;
