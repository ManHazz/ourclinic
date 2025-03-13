import React from "react";

const Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"]; // Define Navitem if not imported

const Footer = () => {
  return (
    <footer className="w-full bg-[#000D13] text-white">
      {/* Team Section */}
      <div className="flex mt-5 flex-col gap-2.5 py-5 md:py-0 md:gap-12 items-center justify-center z-10">
        <div className="md:text-4xl text-3xl leading-[60px] tracking-[0.02em] text-[#EDF6FF font-semibold">
          Our Team!
        </div>
        <div className="md:text-lg text-base leading-[30px] tracking-[0.02em] text-[#EDF6FF] font-normal text-center">
          We are a team of dedicated professionals, ready to do whatever it
          takes to make your business grow.
        </div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col items-center justify-center max-h-fit xl:max-w-full w-full">
        <div className="flex gap-5 px-3 xl:gap-28 lg:gap-12 flex-col md:flex-row md:gap-5 justify-center mt-8 md:mt-14 xl:px-0 md:px-7 max-w-xl md:max-w-7xl">
          {/* Logo and Social Media */}
          <div className="flex flex-col gap-3.5 lg:gap-6 md:gap-3.5">
            <a href="#_" className="max-w-fit -mt-2.5">
              <img src="/logofooter.svg" alt="footer" />
            </a>
            <div className="text-[#F2F2F2] xl:max-w-[249px] lg:max-w-[249px] md:max-w-[190px] text-justify xl:text-base md:text-xs lg:text-sm leading-6 tracking-[0.02em] font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              habitant enim eget at non, integer non tempus.
            </div>
            <div className="flex justify-between max-w-[200px] lg:gap-7 gap-3.5 items-center">
              <img
                src="/facebookicon.svg"
                alt="facebook"
                className="cursor-pointer"
              />
              <img
                src="/linkedinicon.svg"
                alt="linkedin"
                className="cursor-pointer"
              />
              <img
                src="/twittericon.svg"
                alt="twitter"
                className="cursor-pointer"
              />
              <img
                src="/instagramicon.svg"
                alt="instagram"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:gap-6 gap-2.5">
            <div className="text-[#DDA45C] xl:text-xl lg:text-lg md:text-sm leading-7 tracking-[0.02em] text-justify font-semibold">
              Links
            </div>
            {Navitem.map((navitem, index) => (
              <a
                key={index}
                href="#_"
                className="text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify"
              >
                {navitem}
              </a>
            ))}
          </div>

          {/* Services Section */}
          <div className="flex flex-col md:gap-6 gap-2.5">
            <div className="text-[#DDA45C] xl:text-xl lg:text-lg md:text-sm leading-7 tracking-[0.02em] text-justify font-semibold">
              Services
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-8 text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
                <a href="#_" className="lg:w-28 w-24 md:w-20">
                  Drug crime
                </a>
                <a href="#_">Evading</a>
              </div>
              <div className="flex gap-8 text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
                <a href="#_" className="lg:w-28 w-24 md:w-20">
                  Robbery
                </a>
                <a href="#_">Hit and Run</a>
              </div>
              <div className="flex gap-8 text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
                <a href="#_" className="lg:w-28 w-24 md:w-20">
                  Investigations
                </a>
                <a href="#_">Theft</a>
              </div>
              <div className="flex gap-8 text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
                <a href="#_" className="lg:w-28 w-24 md:w-20">
                  Assault
                </a>
                <a href="#_">Disturbing the peace</a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-2.5 lg:gap-6 md:gap-3.5">
            <div className="text-[#DDA45C] xl:text-xl lg:text-lg md:text-sm leading-7 tracking-[0.02em] text-justify font-semibold">
              Contact
            </div>
            <div className="max-w-[243px] text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-start">
              802, Orbit complex, C.G Road, Ahmedabad, 380009.
            </div>
            <div className="text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
              +91 12345 67890
            </div>
            <div className="text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
              info.advocate@gmail.com
            </div>
            <div className="text-[#F2F2F2] text-sm leading-6 font-normal text-justify">
              <a href="#_">
                <div className="xl:max-w-[211px] lg:max-w-[170px] md:max-w-[170px] lg:py-3 md:py-2 py-2.5 bg-[#DDA45C] text-center text-white font-medium">
                  <button>Book free Consultation</button>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1.17px] md:mt-3.5 mt-2.5 w-full bg-[#A3A3A3]"></div>

        {/* Copyright and Policies */}
        <div className="flex gap-2 items-start px-3 xl:px-0 md:px-7 md:flex-row justify-between md:items-center w-full max-w-xl md:max-w-7xl flex-wrap md:mt-7 mt-2.5 mb-3.5">
          <div className="text-white text-sm xl:text-base whitespace-nowrap lg:text-sm md:text-xs flex items-center gap-1">
            OurClinic
            <img src="/copyright.svg" alt="copyright" />
            {new Date().getFullYear()} All Rights Reserved
          </div>
          <div className="flex md:gap-4 gap-1.5 whitespace-nowrap text-white font-normal leading-6 text-sm xl:text-base lg:text-sm md:text-xs tracking-[0.02em]">
            <div className="cursor-pointer">Terms of Service</div>
            <div>|</div>
            <div className="cursor-pointer">Privacy Policy</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
