import React from "react";

const MedCard = ({ imageURL, name, type, balance }) => {
  const gotoGoogle = (name) => {
    window.open(`https://www.google.com/search?q=${name}`, "_blank");
  };

  return (
    <div className="group relative flex items-center justify-center mx-4 my-4">
      {" "}
      {/* Added margin */}
      <div className="w-72 h-[480px] transform transition-all duration-300 hover:scale-105">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
            <img
              src={imageURL}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Title Section */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 truncate">
                {name}
              </h3>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium whitespace-nowrap">
                {type}
              </span>
            </div>

            {/* Balance */}
            <div className="flex items-center space-x-2 mb-6">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700 truncate">
                {balance}
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              <button
                onClick={() => gotoGoogle(name)}
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-semibold
                         transform transition-all duration-300 hover:from-indigo-600 hover:to-violet-700 hover:shadow-lg
                         active:scale-95"
              >
                More Details
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedCard;
