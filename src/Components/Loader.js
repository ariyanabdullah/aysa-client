import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <div className="h-screen">
        <div className="flex justify-center items-center mt-[-30px] h-full">
          <BeatLoader color="#570df8" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
