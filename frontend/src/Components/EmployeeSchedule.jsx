import { useState, useEffect } from "react";
import {
  ClockIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const EmployeeSchedule = ({ category }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5250/api/employee/${category}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch schedule data");
        const data = await response.json();
        const groupedSchedule = groupByDay(data);
        setScheduleData(groupedSchedule);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

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
    <div className="w-full font-inter">
      {loading ? (
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
        <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-violet-500 to-indigo-500">
              <tr>
                {["Day", "Day Shift", "Recess", "Night Shift", "Closing"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="p-4 text-left text-white font-semibold text-sm uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl"
                    >
                      <div className="flex items-center gap-2">
                        {header === "Day" && <ClockIcon className="w-5 h-5" />}
                        {header === "Day Shift" && (
                          <SunIcon className="w-5 h-5" />
                        )}
                        {header === "Night Shift" && (
                          <MoonIcon className="w-5 h-5" />
                        )}
                        {header}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {scheduleData.map((schedule, index) => (
                <tr
                  key={index}
                  className="hover:bg-violet-50 transition-colors bg-gray-50" // Changed background
                >
                  <td className="p-4 font-medium text-gray-700">
                    {schedule.day}
                  </td>

                  {/* Day Shift Cell */}
                  <td className="p-4 bg-white">
                    {" "}
                    {/* Added white background */}
                    {schedule.dayShift ? (
                      <div className="flex items-center gap-3">
                        <UserCircleIcon className="w-8 h-8 text-amber-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {schedule.dayShift.name}
                          </p>
                          <p className="text-sm text-amber-600">
                            {schedule.dayShift.phoneNumber}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">
                        Not scheduled
                      </span>
                    )}
                  </td>

                  {/* Recess Cell */}
                  <td className="p-4 text-center bg-white">
                    {" "}
                    {/* Added white background */}
                    <div className="inline-flex items-center gap-2 bg-violet-100 px-3 py-1 rounded-full">
                      <ClockIcon className="w-4 h-4 text-violet-700" />{" "}
                      {/* Darker icon */}
                      <span className="text-sm font-medium text-violet-700">
                        {" "}
                        {/* Darker text */}
                        {schedule.day === "Friday"
                          ? "12:00 - 14:15"
                          : "12:00 - 13:30"}
                      </span>
                    </div>
                  </td>

                  {/* Night Shift Cell */}
                  <td className="p-4 bg-white">
                    {" "}
                    {/* Added white background */}
                    {schedule.nightShift ? (
                      <div className="flex items-center gap-3">
                        <UserCircleIcon className="w-8 h-8 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {schedule.nightShift.name}
                          </p>
                          <p className="text-sm text-indigo-600">
                            {schedule.nightShift.phoneNumber}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">
                        Not scheduled
                      </span>
                    )}
                  </td>

                  {/* Closing Time Cell */}
                  <td className="p-4 text-center bg-white">
                    {" "}
                    {/* Added white background */}
                    <span className="inline-flex items-center gap-1.5 bg-indigo-100 px-3 py-1 rounded-full">
                      <span className="text-indigo-700 font-medium">
                        {" "}
                        {/* Darker text */}
                        22:00
                      </span>
                    </span>
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
