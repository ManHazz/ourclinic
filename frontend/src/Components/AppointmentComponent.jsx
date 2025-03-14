import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const AppointmentComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    illness: "",
    doctor: "",
    timeSlot: "day",
    day: "Monday",
  });
  const [loading, setLoading] = useState({
    appointments: true,
    schedule: true,
  });
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const appointmentsRes = await fetch(
          "http://localhost:5250/api/patient"
        );
        const appointmentsData = await appointmentsRes.json();
        setAppointments(
          Array.isArray(appointmentsData) ? appointmentsData : []
        );

        // Fetch schedule data
        const scheduleRes = await fetch(
          "http://localhost:5250/api/employee/doctors"
        );
        const scheduleData = await scheduleRes.json();
        setScheduleData(scheduleData);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading({ appointments: false, schedule: false });
      }
    };

    fetchData();
  }, []);

  // Update available doctors when day changes
  const availableDoctors = scheduleData.reduce((acc, employee) => {
    if (employee.day === formData.day) {
      acc.push({
        name: employee.name,
        shift: employee.shift,
      });
    }
    return acc;
  }, []);

  // Filtering and pagination logic
  const filteredAppointments = appointments.filter((appointment) =>
    Object.values(appointment).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * appointmentsPerPage;
  const indexOfFirst = indexOfLast - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "day" && { doctor: "" }), // Reset doctor when day changes
    }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!availableDoctors.some((doc) => doc.name === formData.doctor)) {
      alert("Please select a valid doctor for the selected day");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5250/api/appointment/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      // Refresh appointments
      const updatedRes = await fetch("http://localhost:5250/api/patient");
      setAppointments(await updatedRes.json());

      closeModal();
      setFormData({
        name: "",
        age: "",
        illness: "",
        doctor: "",
        timeSlot: "day",
        day: "Monday",
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.message);
    }
  };

  const openModal = () =>
    document.getElementById("myModal").classList.remove("hidden");
  const closeModal = () =>
    document.getElementById("myModal").classList.add("hidden");

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8 z-1">
      <div className="w-full max-w-9xl bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-indigo-50">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Patient Directory
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredAppointments.length} records found
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button
                onClick={openModal}
                className="flex items-center bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-lg transition-colors gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading.appointments ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-violet-500"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-red-600">
                Loading Error
              </h3>
            </div>
            <p className="text-red-500 text-center max-w-md">{error}</p>
          </div>
        ) : (
          <>
            {/* Appointments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {currentAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 hover:border-violet-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Age: {appointment.age}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-sm">
                      {appointment.day}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg">
                      <UserCircleIcon className="w-6 h-6 text-indigo-600" />
                      <h4 className="text-lg font-semibold text-indigo-800">
                        {appointment.doctor}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Condition:
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">
                        {appointment.illness}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Time:
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                        {appointment.timeSlot.charAt(0).toUpperCase() +
                          appointment.timeSlot.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-violet-50">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-violet-700">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Appointment Modal */}
        <div
          id="myModal"
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm hidden flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-96 p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              New Appointment
            </h2>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <input
                      name="illness"
                      value={formData.illness}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor
                  </label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {availableDoctors.length > 0 ? (
                      availableDoctors.map((doctor, index) => (
                        <option key={index} value={doctor.name}>
                          {doctor.name} ({doctor.shift} Shift)
                        </option>
                      ))
                    ) : (
                      <option disabled>No doctors available this day</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day
                    </label>
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                    >
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors"
                    >
                      <option value="day">Day</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="button"
                    className="col-span-1 py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="col-span-1 py-2 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentComponent;
