import { useState, useEffect } from "react";

const EmployeeSchedule = ({ category }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5250/api/employee/${category}`; // API changes based on selected tab

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const groupedSchedule = groupByDay(data);
        setScheduleData(groupedSchedule);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {loading && (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg text-white">Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto w-full rounded-xl">
          {" "}
          {/* Added margin-bottom for space below the table */}
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
                    style={{ width: "150px" }} // Fixed width for each column
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
                  style={{ height: "60px" }} // Fixed height for each row
                >
                  <td
                    className="p-4 border border-gray-300 font-semibold"
                    style={{ width: "150px" }}
                  >
                    {schedule.day}
                  </td>
                  <td
                    className="p-4 border border-gray-300"
                    style={{ width: "150px" }}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {schedule.dayShift ? schedule.dayShift.name : "N/A"}
                      </span>
                      <span className="text-sm">
                        {schedule.dayShift
                          ? schedule.dayShift.phoneNumber
                          : "N/A"}
                      </span>
                    </div>
                  </td>
                  <td
                    className="p-4 border border-gray-300 text-center"
                    style={{ width: "150px" }}
                  >
                    {schedule.day === "Friday"
                      ? "12:00 PM - 2:15 PM"
                      : "12:00 PM - 1:30 PM"}
                  </td>
                  <td
                    className="p-4 border border-gray-300"
                    style={{ width: "150px" }}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {schedule.nightShift ? schedule.nightShift.name : "N/A"}
                      </span>
                      <span className="text-sm">
                        {schedule.nightShift
                          ? schedule.nightShift.phoneNumber
                          : "N/A"}
                      </span>
                    </div>
                  </td>

                  <td
                    className="p-4 border border-gray-300 text-center"
                    style={{ width: "150px" }}
                  >
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
