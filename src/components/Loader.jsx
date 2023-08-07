import React from "react";

const DottedLoader = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin">
        <div className="w-10 h-10 border-4 border-blue-600 rounded-sm ">
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default DottedLoader;
