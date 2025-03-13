import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MedCard from "./Components/MedCard";

let Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"];

const medicineURL = "http://localhost:5250/api/medicine";

const MedicineTab = () => {
  const [navbar, setNavbar] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(medicineURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      {/* Content and BG */}
      <div className="relative w-full md:min-h-[761px] min-h-[700px] flex justify-center items-center">
        <img
          src="/popular_lawyer_back.png"
          alt="popular"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-20">
          <h2 className="text-xl font-semibold z-1 mb-25">
            Available Medicines
          </h2>
        </div>

        <div className="flex flex-wrap justify-center">
          {currentItems.map((product, index) => (
            <MedCard
              key={index}
              image={product.image}
              name={product.name}
              type={product.type}
              balance={product.balance}
            />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="flex mt-5 flex-col gap-2.5 py-5 md:py-0 md:gap-12 items-center justify-center z-10">
        <div className="md:text-4xl text-3xl leading-[60px] tracking-[0.02em] text-[#1C1C23] font-semibold">
          Our Team!
        </div>
        <div className="md:text-lg text-base leading-[30px] tracking-[0.02em] text-[#1C1C23] font-normal text-center">
          We are a team of dedicated professionals, ready to do whatever it
          takes to make your business grow.
        </div>
      </div>
      <div className="w-full">
        <div className="flex md:mt-14 mt-0 flex-col items-center justify-center max-h-fit xl:max-w-full w-full bg-[#000D13]">
          <div className="flex gap-5 px-3 xl:gap-28 lg:gap-12 flex-col md:flex-row md:gap-5 justify-center mt-8 md:mt-14 xl:px-0 md:px-7 max-w-xl md:max-w-7xl">
            <div className="flex flex-col gap-3.5 lg:gap-6 md:gap-3.5">
              <a href="#_" className="max-w-fit -mt-2.5">
                <img src={"/logofooter.svg"} alt="footer" />
              </a>
              <div className="text-[#F2F2F2] xl:max-w-[249px] lg:max-w-[249px] md:max-w-[190px] text-justify xl:text-base md:text-xs lg:text-sm leading-6 tracking-[0.02em] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
                habitant enim eget at non, integer non tempus.
              </div>
              <div className="flex justify-between max-w-[200px] lg:gap-7 gap-3.5 items-center">
                <img
                  src={"/facebookicon.svg"}
                  alt="facebook"
                  className="cursor-pointer"
                />
                <img
                  src={"/linkedinicon.svg"}
                  alt="linkedin"
                  className="cursor-pointer"
                />
                <img
                  src={"/twittericon.svg"}
                  alt="twitter"
                  className="cursor-pointer"
                />
                <img
                  src={"/instagramicon.svg"}
                  alt="instagram"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col md:gap-6 gap-2.5">
              <div className="text-[#DDA45C] xl:text-xl lg:text-lg md:text-sm leading-7 tracking-[0.02em] text-justify font-semibold">
                Links
              </div>
              {Navitem.map((navitem, index) => {
                return (
                  <a
                    key={index}
                    href="#_"
                    className="text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify"
                  >
                    {navitem}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col md:gap-6 gap-2.5">
              <div className="text-[#DDA45C] xl:text-xl lg:text-lg md:text-sm leading-7 tracking-[0.02em] text-justify font-semibold">
                Services
              </div>
              <div className="flex gap-8 w-full text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
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
                <a href="#_" className="tett-strat flex justify-start">
                  Theft
                </a>
              </div>
              <div className="flex gap-8 text-[#F2F2F2] xl:text-base lg:text-sm md:text-xs leading-6 font-normal text-justify">
                <a href="#_" className=" lg:w-28 w-24 md:w-20">
                  Assault
                </a>
                <a href="#_" className="whitespace-nowrap">
                  Disturbing the peace
                </a>
              </div>
            </div>
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
              <div className="text-[#F2F2F2]  text-sm leading-6 font-normal text-justify">
                <a href="#_">
                  <div className="xl:max-w-[211px] lg:max-w-[170px] md:max-w-[170px] lg:py-3 md:py-2 py-2.5 bg-[#DDA45C] text-center text-white font-medium">
                    <button>Book free Consultation</button>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="h-[1.17px] md:mt-3.5 mt-2.5 w-full bg-[#A3A3A3]"></div>
          <div className="flex gap-2 items-start px-3 xl:px-0 md:px-7 md:flex-row justify-between md:items-center w-full max-w-xl md:max-w-7xl flex-wrap md:mt-7 mt-2.5 mb-3.5">
            <div className="text-white text-sm xl:text-base whitespace-nowrap lg:text-sm md:text-xs flex items-center gap-1">
              OurClinic
              <img src={"/copyright.svg"} alt="copyright" />
              {new Date().getFullYear()} All Rights Reserved
            </div>
            <div className="flex md:gap-4 gap-1.5 whitespace-nowrap text-white font-normal leading-6 text-sm xl:text-base lg:text-sm md:text-xs tracking-[0.02em]">
              <div className="cursor-pointer">Terms of Service</div>
              <div>|</div>
              <div className="cursor-pointer">Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineTab;
