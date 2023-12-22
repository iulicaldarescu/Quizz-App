import React from "react";
import { Link } from "react-router-dom";
import useStore from "../stores/myZusand";

function Subject({ id, title, icon, questions }) {
  const { subjectObject, setSubjectObject } = useStore();
  const getSubjectProps = () => {
    const myObject = {
      id: id,
      title: title,
      icon: icon,
      questions: questions,
    };
    setSubjectObject(myObject);
    console.log(myObject);
  };

  return (
    <Link to={`/${title}`}>
      <div
        onClick={getSubjectProps}
        className="flex gap-5 px-3 text-black border-2 border-black dark:border-0 dark:bg-[#3c4d67] py-2 items-center dark:text-white font-bold rounded-xl"
      >
        <div className="bg-slate-200 rounded-lg">
          <img className="p-1" src={icon}></img>
        </div>
        <p className="text-lg">{title}</p>
      </div>
    </Link>
  );
}

export default Subject;
