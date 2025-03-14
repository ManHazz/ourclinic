import React from "react";

const Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"];

const Footer = () => {
  return (
    <footer className="w-full bg-[#000D13] text-white pt-8">
      {/* Footer Content */}
      <div className="flex flex-col items-center justify-center max-h-fit xl:max-w-full w-full">
        <div className="flex gap-5 px-3 xl:gap-28 lg:gap-12 flex-col md:flex-row md:gap-5 justify-center mt-8 md:mt-14 xl:px-0 md:px-7 max-w-xl md:max-w-7xl">
          {/* Updated Logo Section */}
          <div className="flex flex-col gap-4 lg:gap-6 md:gap-4">
            <div className="flex items-center space-x-3 -ml-2">
              <a href="#" className="inline-block">
                <img
                  src="/ourclinic-logo-no-bg.png"
                  alt="OurClinic Logo"
                  className="w-[80px] md:w-[100px] lg:w-[120px] h-auto transition-all duration-300 hover:scale-105"
                />
              </a>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                OurClinic
              </span>
            </div>
            <div className="text-[#F2F2F2] max-w-[280px] text-sm md:text-base leading-6 tracking-[0.02em] font-normal">
              Comprehensive healthcare solutions with compassion and expertise.
            </div>
            <div className="flex gap-4 max-w-[200px]">
              <img
                src="/facebookicon.svg"
                alt="Facebook"
                className="w-6 h-6 hover:opacity-75 cursor-pointer"
              />
              <img
                src="/linkedinicon.svg"
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-75 cursor-pointer"
              />
              <img
                src="/twittericon.svg"
                alt="Twitter"
                className="w-6 h-6 hover:opacity-75 cursor-pointer"
              />
              <img
                src="/instagramicon.svg"
                alt="Instagram"
                className="w-6 h-6 hover:opacity-75 cursor-pointer"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:gap-4 gap-2">
            <h3 className="text-[#DDA45C] text-lg md:text-xl font-semibold">
              Quick Links
            </h3>
            {Navitem.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-white text-sm md:text-base hover:text-[#DDA45C] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Services Section */}
          <div className="flex flex-col md:gap-4 gap-2">
            <h3 className="text-[#DDA45C] text-lg md:text-xl font-semibold">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Primary Care
              </a>
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Specialty Care
              </a>
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Emergency Services
              </a>
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Diagnostic Imaging
              </a>
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Mental Health
              </a>
              <a
                href="#"
                className="text-white text-sm md:text-base hover:text-[#DDA45C]"
              >
                Preventive Care
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col md:gap-4 gap-2">
            <h3 className="text-[#DDA45C] text-lg md:text-xl font-semibold">
              Contact Us
            </h3>
            <p className="text-white text-sm md:text-base">
              123 Healthcare Street
              <br />
              Medical City, HC 45678
            </p>
            <p className="text-white text-sm md:text-base mt-2">
              Phone: (555) 123-4567
              <br />
              Email: contact@ourclinic.com
            </p>
            <a
              href="#contact"
              className="mt-3 inline-block bg-[#DDA45C] text-white px-4 py-2 rounded-md hover:bg-[#C08F4A] transition-colors text-sm md:text-base"
            >
              Schedule Appointment
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="w-full border-t border-[#2D3748] mt-8 pt-4 mb-5">
          <div className="flex flex-col md:flex-row justify-between items-center px-5 max-w-7xl mx-auto text-sm text-[#A0AEC0]">
            <div className="mb-2 md:mb-0">
              © {new Date().getFullYear()} OurClinic. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a
                href="#terms"
                className="hover:text-[#DDA45C] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#privacy"
                className="hover:text-[#DDA45C] transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
