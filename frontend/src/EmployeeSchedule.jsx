import { useState, useEffect } from "react";

const EmployeeSchedule = ({ category }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5250/api/employee/${category}`; // API changes based on selected tab

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const groupedSchedule = groupByDay(data);
        setScheduleData(groupedSchedule);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [category]);

  // Group schedule data by day
  const groupByDay = (data) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return daysOfWeek.map((day) => {
      const dayEmployees = data.filter((employee) => employee.day === day);
      return {
        day,
        dayShift: dayEmployees.find((emp) => emp.shift === "Day") || null,
        nightShift: dayEmployees.find((emp) => emp.shift === "Night") || null,
      };
    });
  };

  return (
    <div className="w-full">
      {loading && <p className="text-lg text-white">Loading...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="bg-[#7692FF] text-white text-lg">
                {[
                  "Day",
                  "Day Shift",
                  "Recess",
                  "Night Shift",
                  "Closing Time",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-4 text-left border border-gray-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((schedule, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 bg-gray-700 bg-opacity-50"
                >
                  <td className="p-4 border border-gray-300 font-semibold">
                    {schedule.day}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {schedule.dayShift ? schedule.dayShift.name : "N/A"}
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    {schedule.day === "Friday"
                      ? "12:00 PM - 2:15 PM"
                      : "12:00 PM - 1:30 PM"}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {schedule.nightShift ? schedule.nightShift.name : "N/A"}
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    10:00 PM
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedule;
