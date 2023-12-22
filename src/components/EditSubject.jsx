import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../config/supabaseConfig";
import { useFormik } from "formik";

function EditSubject() {
  const { id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [dataRowById, setDataRowById] = useState([]);
  const [flag, setFlag] = useState(false);

  // Question number input handler
  const handleChange = (event) => {
    setQuestionNumber(event.target.value);
  };

  // FORMIK fileds set up
  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      options: [],
    },
  });

  // FETCH FROM DATABASE
  const getQuestion = async () => {
    const { data, error } = await supabase
      .from("QuizzApp-Quizz")
      .select()
      .eq("id", id);

    setDataRowById(data[0]);
    setFlag(true);

    // update formik
    formik.setValues({
      question: data[0]?.questions?.[questionNumber - 1]?.question || "",
      answer: data[0]?.questions?.[questionNumber - 1]?.answer || "",
      options: data[0]?.questions?.[questionNumber - 1]?.options || [],
    });
  };

  // HANDLE CHANGE INPUT FUNCTION CALL
  const handleChangeRealTime = (event) => {
    const id = parseInt(event.target.id);
    const value = event.target.value;

    const newArr = formik.values.options.map((option, index) => {
      if (index === id) {
        option = value;
      }
      return option;
    });

    formik.setFieldValue("options", newArr);
  };

  // DATABASE UPDATE AT SUBMIT
  const updateDB = async () => {
    const newQuestionsArray = [...dataRowById.questions];

    const newQuestionObject = {
      answer: formik.values.answer,
      options: formik.values.options,
      question: formik.values.question,
    };

    //insert the modified object from questions array on the related index position
    newQuestionsArray[questionNumber - 1] = newQuestionObject;

    // HERE UPDATE SUPABSE IN OPTIONS ARRAY
    const { error } = await supabase
      .from("QuizzApp-Quizz")
      .update({
        questions: newQuestionsArray,
      })
      .eq("id", id);
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 2xl:px-96">
      <div className="flex items-center mb-5 gap-3">
        <label className="text-black dark:text-white" htmlFor="questionNumber">
          Question number
        </label>
        <input
          className="focus:outline-none text-black dark:text-white dark:bg-slate-500 rounded-xl py-1 text-center w-16"
          onChange={handleChange}
          type="number"
          name="questionNumber"
          placeholder="0"
        ></input>
        <button
          onClick={getQuestion}
          className="bg-orange-500 rounded-xl px-3 py-1 text-white"
        >
          Display
        </button>
      </div>
      {!(
        questionNumber >= 1 && questionNumber <= dataRowById?.questions?.length
      ) && (
        <p className="text-red-500 mt-10 text-lg font-semibold">
          No question found at this number !
        </p>
      )}
      {flag &&
        questionNumber >= 1 &&
        questionNumber <= dataRowById?.questions?.length && (
          //this is dynamic
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            {/* QUESTION */}
            <div className="flex flex-col">
              <label htmlFor="question">Question</label>
              <textarea
                id="question"
                className=" w-full resize-none bg-white dark:bg-slate-500 rounded-xl px-4 py-1"
                type="text"
                placeholder="Question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
              >
                {dataRowById.questions[questionNumber - 1]?.question}
              </textarea>
            </div>
            {/* ANSWER */}
            <div className="flex flex-col">
              <label htmlFor="answer">Answer</label>
              <textarea
                onChange={formik.handleChange}
                value={formik.values.answer}
                id="answer"
                className=" w-full resize-none bg-white dark:bg-slate-500 rounded-xl px-4 py-1"
                type="text"
                placeholder="Answer"
              >
                {dataRowById.questions[questionNumber - 1]?.answer}
              </textarea>
            </div>
            {/* OPTIONS */}
            <div className="flex flex-col gap-2">
              {" "}
              {dataRowById?.questions?.[questionNumber - 1]?.options.map(
                (option, index) => {
                  return (
                    <div className="flex flex-col">
                      <label htmlFor="option">Option {index + 1}</label>
                      <textarea
                        id={index}
                        onChange={handleChangeRealTime}
                        className=" w-full resize-none bg-white dark:bg-slate-500 rounded-xl px-4 py-1"
                      >
                        {option}
                      </textarea>
                    </div>
                  );
                }
              )}
            </div>
            {/* SUBMIT ON FORMIK */}
            <div className="flex justify-center">
              <button
                onClick={updateDB}
                type="button"
                className="bg-green-600 rounded-xl px-3 py-1 text-white mt-5"
              >
                Submit
              </button>
            </div>
          </form>
        )}
    </div>
  );
}

export default EditSubject;
