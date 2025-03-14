import { useState } from "react";
import { Link } from "react-router-dom";
import AppointmentComponent from "./Components/AppointmentComponent";
import Footer from "./Components/Footer";

let Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"];

const AppointmentTab = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="font-poppins flex flex-col justify-center items-center !bg-white">
      {/* Navbar Section */}
      <div className="w-full h-[110px] bg-[#EDF6FF] flex justify-center">
        <div className="flex justify-between items-center px-5 w-full max-w-[1440px]">
          <div className="pl-4 md:pl-6 lg:pl-8 pt-4">
            <div className="flex items-center space-x-4 w-max">
              <a href="#" className="inline-block">
                <img
                  src="/ourclinic-logo-no-bg.png"
                  alt="logo"
                  className="w-[80px] md:w-[120px] lg:w-[150px] h-auto mb-5"
                />
              </a>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-5">
                OurClinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center min-w-[200px] sm:min-w-[200px] md:min-w-[280px] gap-0 sm:gap-5 lg:min-w-[400px] xl:gap-20 w-full font-medium sm:text-xs xl:text-lg md:text-[15px] lg:text-[15px] tracking-tight leading-7">
            {Navitem.map((navitem, index) => (
              <Link
                key={index}
                to={`/${navitem.toLowerCase()}`}
                className="text-[#1C1C23] hover:text-indigo-700 font-semibold"
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

          {/* Mobile Navigation (Fixed and Properly Positioned) */}
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
                  onClick={() => setNavbar(false)} // Close menu on click
                >
                  {navitem}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content and BG */}
      <div className="relative w-full md:min-h-[761px] min-h-[700px] flex justify-center items-center">
        <img
          src="/popular_lawyer_back.png"
          alt="popular"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <AppointmentComponent />
      </div>

      {/* Content Section */}
      <div className="flex mt-5 flex-col gap-2.5 py-5 md:py-0 md:gap-12 items-center justify-center z-10 mb-15">
        <div className="md:text-4xl text-3xl leading-[60px] tracking-[0.02em] text-[#1C1C23] font-semibold">
          Our Team!
        </div>
        <div className="md:text-lg text-base leading-[30px] tracking-[0.02em] text-[#1C1C23] font-normal text-center">
          24/7 dedicated medical team ready to respond with expertise and
          compassion - your health is our priority,
          <br></br>
          and we'll use every resource to ensure your best possible outcome.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentTab;
