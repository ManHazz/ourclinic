import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

let Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"];

const PatientTab = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="font-poppins flex flex-col justify-center items-center !bg-white">
      {/* Navbar Section */}
      <div className="w-full h-[110px] bg-[#EDF6FF] flex justify-center relative">
        <div className="flex justify-between md:justify-between items-center px-5 w-full max-w-[1440px] sm:px-5 lg:px-24 sm:gap-7 md:gap-12 lg:gap-20 xl:gap-32">
          {/* Logo */}
          <a href="#" className="w-full max-w-fit">
            <img src={"/logo.svg"} alt="logo" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center min-w-[200px] sm:min-w-[200px] md:min-w-[280px] gap-0 sm:gap-5 lg:min-w-[400px] xl:gap-20 w-full font-medium sm:text-xs xl:text-lg md:text-[15px] lg:text-[15px] tracking-tight leading-7">
            {Navitem.map((navitem, index) => (
              <Link
                key={index}
                to={`/${navitem.toLowerCase()}`}
                className="text-[#1C1C23] hover:text-[#DDA45C] font-semibold"
              >
                {navitem}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden cursor-pointer z-50"
            onClick={() => setNavbar(!navbar)}
          >
            <img src={"/menu.svg"} alt="menu" className="h-[30px]" />
          </div>

          {/* Mobile Navigation */}
          <div
            className={`absolute top-[110px] right-0 w-full bg-white shadow-xl transition-transform duration-500 ease-in-out z-40 ${
              navbar
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } md:hidden`}
          >
            <div className="flex flex-col items-center py-5 gap-4">
              {Navitem.map((navitem, index) => (
                <Link
                  key={index}
                  to={`/${navitem.toLowerCase()}`}
                  className="text-[#1C1C23] hover:text-[#DDA45C] font-semibold text-lg"
                  onClick={() => setNavbar(false)}
                >
                  {navitem}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Image (Fixed to Avoid Overlapping) */}
      <div className="relative w-full md:min-h-[761px] min-h-[700px] flex justify-center items-center">
        <img
          src="/popular_lawyer_back.png"
          alt="popular"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Table Container */}
        <div className="relative z-10 bg-white bg-opacity-90 p-5 rounded-xl shadow-lg max-w-5xl w-full mx-5 overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#DDA45C] text-white">
                {[
                  "ID",
                  "Name",
                  "Age",
                  "Problem",
                  "Appointment Date",
                  "Appointment Time",
                  "Doctor",
                ].map((header, index) => (
                  <th key={index} className="p-3 text-left">
                    <input
                      type="text"
                      className="w-full p-2 text-black rounded-md border border-gray-300"
                      placeholder={header}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {[
                {
                  id: "123",
                  name: "Goku",
                  age: "23",
                  problem: "Fever",
                  date: "10/3",
                  time: "12:30",
                  doctor: "Dr. Wakanda",
                },
                {
                  id: "124",
                  name: "Gohan",
                  age: "18",
                  problem: "Headache",
                  date: "12/5",
                  time: "12:30",
                  doctor: "Dr. Kumar",
                },
              ].map((patient, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="p-3 border">{patient.id}</td>
                  <td className="p-3 border">{patient.name}</td>
                  <td className="p-3 border">{patient.age}</td>
                  <td className="p-3 border">{patient.problem}</td>
                  <td className="p-3 border">{patient.date}</td>
                  <td className="p-3 border">{patient.time}</td>
                  <td className="p-3 border">{patient.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Section */}
      <Footer />
    </div>
  );
};

export default PatientTab;
