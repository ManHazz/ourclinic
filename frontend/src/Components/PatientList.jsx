import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const PatientList = () => {
  // State management
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch patient data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5250/api/patient");
        const data = await response.json();
        Array.isArray(data) ? setPatients(data) : setPatients([]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPatients([]);
      }
    };
    fetchPatients();
  }, []);

  // Filtering and pagination logic
  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * patientsPerPage;
  const indexOfFirst = indexOfLast - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);

  const paginate = (page) => setCurrentPage(page);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getDayColor = (day) => {
    switch (day.toLowerCase()) {
      case "monday":
        return "bg-violet-100 text-violet-800";
      case "tuesday":
        return "bg-indigo-100 text-indigo-800";
      case "wednesday":
        return "bg-blue-100 text-blue-800";
      case "thursday":
        return "bg-cyan-100 text-cyan-800";
      case "friday":
        return "bg-amber-100 text-amber-800";
      case "saturday":
        return "bg-emerald-100 text-emerald-800";
      case "sunday":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8 z-1 rounded-2xl">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Patient Directory
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredPatients.length} records found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm text-gray-700 placeholder-gray-400 transition-all"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-violet-50">
              <tr>
                {["Name", "Age", "Condition", "Physician", "Time", "Day"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-violet-700 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        {header === "Name" && (
                          <UserCircleIcon className="w-4 h-4" />
                        )}
                        {header === "Age" && (
                          <CalendarIcon className="w-4 h-4" />
                        )}
                        {header === "Time" && <ClockIcon className="w-4 h-4" />}
                        {header}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPatients.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-violet-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserCircleIcon className="w-6 h-6 text-violet-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                      {patient.illness}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    Dr. {patient.doctor}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                      {patient.timeSlot}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm ${getDayColor(
                        patient.day
                      )}`}
                    >
                      {patient.day}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-violet-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-violet-700">
              Showing {indexOfFirst + 1} -{" "}
              {Math.min(indexOfLast, filteredPatients.length)} of{" "}
              {filteredPatients.length} patients
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLast >= filteredPatients.length}
                className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
