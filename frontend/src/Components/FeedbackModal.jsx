import React, { useState } from "react";

const feedbackURL = "http://localhost:5250/api/feedback/add";

const FeedbackModal = ({ open, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [mood, setMood] = useState("");

  const sendData = async (feedbackData) => {
    try {
      const response = await fetch(feedbackURL, {
        method: "POST", // Use POST method to send data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData), // Send the feedback data
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json(); // Optionally handle the response
      console.log("Feedback submitted successfully:", data);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data");
    }
  };

  if (!open) return null; // Don't render if not open

  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood); // Update the mood state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      Description: feedback,
      Mood: mood,
    };
    sendData(feedbackData); // Send the feedback data
    setFeedback(""); // Clear the feedback after submission
    setMood(""); // Clear the mood after submission
    onClose(); // Close the modal after submission
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600;700&display=swap');
          body {
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            font-style: normal;
          }
        `}
      </style>
      <div className="flex min-h-screen items-center justify-center p-4 ">
        <div className="w-full max-w-sm">
          <div className="relative rounded-2xl bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Leave feedback
              </h2>
              <button
                onClick={onClose}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="mb-4 text-center text-sm font-semibold">
              We'd love to hear what went well or how we can improve your
              experience.
            </p>
            <form onSubmit={handleSubmit}>
              <textarea
                className="mb-3 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <div className="mb-4 flex justify-start gap-2">
                <button
                  type="button"
                  onClick={() => handleMoodClick("unsatisfied")}
                  className={`text-md rounded-lg border border-gray-200 px-2.5 py-1.5 transition-colors duration-200 ${
                    mood === "unsatisfied" ? "bg-red-100" : "hover:bg-gray-100"
                  }`}
                >
                  😞
                </button>
                <button
                  type="button"
                  onClick={() => handleMoodClick("neutral")}
                  className={`text-md rounded-lg border border-gray-200 px-2.5 py-1.5 transition-colors duration-200 ${
                    mood === "neutral" ? "bg-yellow-100" : "hover:bg-gray-100"
                  }`}
                >
                  😐
                </button>
                <button
                  type="button"
                  onClick={() => handleMoodClick("satisfied")}
                  className={`text-md rounded-lg border border-gray-200 px-2.5 py-1.5 transition-colors duration-200 ${
                    mood === "satisfied" ? "bg-green-100" : "hover:bg-gray-100"
                  }`}
                >
                  😊
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
