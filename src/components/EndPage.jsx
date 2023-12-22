import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import useStore from "../stores/myZusand";

function EndPage({ title, userAnswers, correctAnswers }) {
  //Here we must continue to display the correct and wrong answers

  //find the subject object of the answers
  const { subjectObject } = useStore();

  return (
    <div className="flex flex-col text=black dark:text-white px-8">
      <p className="text-black dark:text-slate-200 font-semibold text-2xl my-5">
        You reached all {title} questions
      </p>
      <p className="text-xl font-semibold italic mt-5 text-left">
        <span className="text-green-600">{correctAnswers}</span> out of{" "}
        {subjectObject.questions.length}
      </p>
      {/* <p className="text-slate-200 font-semibold text-xl">This is you score</p> */}

      <ol
        style={{ listStyleType: "decimal" }}
        className="flex flex-col items-start gap-10 mt-10"
      >
        {subjectObject.questions.map((item, index) => (
          <li className="" key={index}>
            <p className="text-lg font-semibold">{item.question}</p>
            <p>
              <span className="text-green-600 font-bold">Correct answer :</span>{" "}
              {item.answer}
            </p>
            <p>
              <span
                className={`${
                  item.answer === userAnswers[index]
                    ? "text-green-600"
                    : "text-red-500"
                } font-bold`}
              >
                Your answer :
              </span>{" "}
              {userAnswers[index]}
            </p>
          </li>
        ))}
      </ol>

      <Link to="/home">
        <div className="flex w-full justify-center items-center gap-2 mt-6">
          <p className="text-slate-300 text-center text-lg hover:underline">
            Home
          </p>
          <IoIosArrowForward color="rgb(203 213 225)" size={"17px"} />
        </div>
      </Link>
    </div>
  );
}

export default EndPage;
