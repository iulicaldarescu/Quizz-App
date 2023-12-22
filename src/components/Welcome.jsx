import React from "react";

function Welcome() {
  return (
    <div>
      {/* Header third level */}
      <div className="flex flex-col gap-6 text-black dark:text-white">
        <p className="text-4xl">
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </p>
        <p className="italic text-gray-600 dark:text-[#91a2b7]">
          Pick a subject to get started.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
