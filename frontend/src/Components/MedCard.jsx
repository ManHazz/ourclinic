import React from "react";

const MedCard = ({ imageURL, name, type, balance }) => {
  const gotoGoogle = (name) => {
    window.open(`https://www.google.com/search?q=${name}`, "_blank");
  };

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#DFEFFF" }}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-[720px] mx-auto">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-70 mr-7 ml-7"
            style={{ background: "#DFEFFF" }}
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-70">
              <img
                src={imageURL}
                alt="card-image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {name}
                </p>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {type}
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {balance}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={() => gotoGoogle(name)}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedCard;
