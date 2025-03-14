import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import FeedbackModal from "./Components/FeedbackModal";
import MedCard from "./Components/MedCard";
import Footer from "./Components/Footer";
import { ChatBubbleOvalLeftIcon, PhoneIcon } from "@heroicons/react/24/outline";

const medicineURL = "http://localhost:5250/api/medicine";

const settings_first = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        arrows: false,
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
};

let Navitem = ["Home", "Patients", "Schedules", "Appointments", "Medicines"];

let whychooseData = [
  "HIGHLY QUALIFIED MEDICAL PROFESSIONALS",
  "ADVANCED TECHNOLOGY AND TREATMENTS",
  "PATIENT-CENTERED CARE",
  "FOCUS ON PREVENTATIVE HEALTHCARE",
];

let popularLawyer = [
  {
    mainTitle: "ATIF RIFQI",
    subTitle: "UI /UX Designer",
    exp: "Information Technology",
    reviews: "123",
    img_lawyer: "/lawyer_one.png",
  },
  {
    mainTitle: "AIMAN HAZIMIN",
    subTitle: "Team Leader",
    exp: "Computer Engineering",
    reviews: "123",
    img_lawyer: "/lawyer_two.png",
  },
  {
    mainTitle: "ARIQ DANISH",
    subTitle: "Backend Developer",
    exp: "Computer Engineering",
    reviews: "123",
    img_lawyer: "/lawyer_three.png",
  },
  {
    mainTitle: "AQIL ARMAN",
    subTitle: "UI /UX Developer",
    exp: "Information Technology",
    reviews: "123",
    img_lawyer: "/lawyer_one.png",
  },
  {
    mainTitle: "AHMAD AZRI",
    subTitle: "Backend Developer",
    exp: "Computer Engineering",
    reviews: "123",
    img_lawyer: "/lawyer_one.png",
  },
];

let customer = [
  {
    cus_img: "/customer_one.svg",
    cus_mainTitle: "Airil Ron",
    cus_subTitle: "CEO, Financial corp.",
    cus_content:
      "The staff of the entire facility that I had contact with were very attentive, caring and efficient",
  },
  {
    cus_img: "/customer_three.svg",
    cus_mainTitle: "Aiman Haziq",
    cus_subTitle: "CEO, Financial corp.",
    cus_content:
      "I am so glad I chose this clinic! From the quick check-in to the thorough examination, everything was perfect. The doctor was very knowledgeable and patient, making me feel completely comfortable.",
  },
  {
    cus_img: "/customer_two.svg",
    cus_mainTitle: "Adam Mustaqim",
    cus_subTitle: "CEO, Financial corp.",
    cus_content:
      "From registration to medical assistant to physician, everyone was kind and helpful and everything went smoothly and quickly. So appreciate having OurClinic close by for times when needed. Will not hesitate to visit again if need be",
  },
  {
    cus_img: "/customer_three.svg",
    cus_mainTitle: "Haizad Ashraf",
    cus_subTitle: "CEO, Financial corp.",
    cus_content:
      "I have visited this clinic for over 25 years. They are always friendly and generally run on time. Providers take time though to listen and allow plenty of time for questions. My wait today was a little long than usual but that is not typical.",
  },
];
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img src={"/Next_icon.svg"} alt="" className="w-2.5" />
    </div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img src={"/previous_icon.svg"} alt="previous" className="w-2.5" />
    </div>
  );
}
const Home = () => {
  const [navbar, setNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(medicineURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Only take first 5 items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="font-poppins flex flex-col justify-center items-center !bg-white">
        {/* Header Section */}
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

            <div className="hidden md:flex justify-center min-w-[200px] sm:min-w-[200px] md:min-w-[280px] gap-0 sm:gap-5 lg:min-w-[400px] xl:gap-20 w-full font-medium sm:text-xs xl:text-lg md:text-[15px] lg:text-[15px] tracking-tight leading-7">
              {Navitem.map((navitem, index) => {
                return (
                  <Link
                    key={index}
                    to={`/${navitem.toLowerCase()}`} // Dynamic route
                    className="text-[#1C1C23] hover:text-indigo-700 font-semibold"
                  >
                    {navitem}
                  </Link>
                );
              })}
            </div>
            <div
              className={
                navbar
                  ? "block max-h-fit py-9 w-[200px] absolute top-20 right-6 bg-white shadow-2xl rounded-lg transition-all ease-in-out duration-500 z-30 md:hidden"
                  : "hidden"
              }
            >
              <div className="flex flex-col -mb-2.5 sm:flex items-center justify-between gap-2.5 sm:gap-5 w-full font-medium sm:text-xs xl:text-lg md:text-[15px] lg:text-[15px] tracking-tight leading-7">
                {Navitem.map((navitem, index) => {
                  return (
                    <a
                      key={index}
                      href="#_"
                      className="text-[#1C1C23] font-semibold"
                    >
                      {navitem}
                    </a>
                  );
                })}
              </div>
            </div>

            <div
              className="md:hidden cursor-pointer"
              onClick={() => setNavbar(!navbar)}
            >
              <img src={"/menu.svg"} alt="menu" className="h-[30px]" />
            </div>
          </div>
        </div>
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-95 z-0"></div>
          <img
            src="/doctor-bg-2.jpg"
            alt="Medical Team"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <div className="relative z-10 text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span
                  className="text-5xl md:text-7xl font-bold mt-4 block 
           [text-shadow:_2px_3px_3px_rgba(0,0,0,0.3)]
           hover:[text-shadow:_3px_4px_8px_rgb(139_92_246_/_80%)]
           transition-all duration-300 hover:scale-105"
                >
                  Advanced Healthcare
                </span>
                <br />
                <span
                  className="text-3xl md:text-4xl font-medium mt-4 block 
                 [text-shadow:_1px_2px_2px_rgba(0,0,0,0.3)]
                 hover:[text-shadow:_1px_2px_6px_rgb(124_58_237_/_60%)]
                 transition-shadow duration-300"
                >
                  Where Compassion Meets Innovation
                </span>
              </h1>
              <button
                onClick={openModal}
                className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all duration-300"
              >
                <ChatBubbleOvalLeftIcon className="w-5 h-5 mr-2" />
                Write About Us!
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20">
            <FeedbackModal open={isModalOpen} onClose={closeModal} />
          </div>
        )}

        <div className="min-h-[700px] sm:min-h-[761px] w-full flex justify-center relative">
          <img
            src="/popular_lawyer_back.png"
            alt="popular"
            className=" h-[700px] sm:h-[761px] object-cover absolute w-full object-left-top"
          />
          <div className="flex mt-5 flex-col gap-2.5 py-5 md:py-0 md:gap-12 items-center justify-center z-10">
            <div className="md:text-4xl text-3xl leading-[60px] tracking-[0.02em] text-[#1C1C23] font-semibold">
              Our Team!
            </div>
            <div className="lawyers mx-0.5">
              <Slider {...settings_first}>
                {popularLawyer.map((data, index) => {
                  return (
                    <div className="w-full !flex !justify-center" key={index}>
                      <div
                        key={index}
                        className="max-w-[365px] bg-white rounded-b-[5px]"
                      >
                        <div>
                          <img
                            src={data.img_lawyer}
                            alt=""
                            className="w-full hover:opacity-75 cursor-pointer"
                          />
                        </div>
                        <div className="h-[224px] flex flex-col">
                          <div className="flex py-3.5 flex-col items-center">
                            <div className="text-lg leading-7 tracking-[0.04em] font-normal">
                              {data.mainTitle}
                            </div>
                            <div className="text-xs leading-[18px] tracking-[0.04em] text-[#707070] font-medium">
                              {data.subTitle}
                            </div>
                          </div>
                          <div className="h-[1px] w-full !bg-white"></div>
                          <div className="flex flex-col gap-7 mx-auto max-w-[308px] xl:max-w-[308px] lg:max-w-[280px] w-full px-1">
                            <div className=" pt-3.5 w-full items-center flex justify-between">
                              <div className="w-[87px] text-start text-base font-semibold leading-5">
                                Bachelor in
                                <br></br>
                                <span className="font-normal">{data.exp}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <div>5.0</div>
                                  <div className="flex items-center gap-[3px]">
                                    <img src={"/star.svg"} alt="star" />
                                    <img src={"/star.svg"} alt="star" />
                                    <img src={"/star.svg"} alt="star" />
                                    <img src={"/star.svg"} alt="star" />
                                    <img src={"/star.svg"} alt="star" />
                                  </div>
                                </div>
                                <div className="text-start">
                                  {data.reviews} Reviews
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="max-w-[128px] w-full py-2 bg-[#B388EB] rounded-[4px] flex justify-center cursor-pointer">
                                <button className="text-white flex items-center justify-center gap-2.5">
                                  <PhoneIcon className="w-5 h-5" />
                                  Call Now
                                </button>
                              </div>
                              <div className="max-w-[128px] w-full py-2 rounded-[4px] border-[1px] border-[#B388EB] flex justify-center cursor-pointer">
                                <button className="flex items-center justify-center gap-2.5">
                                  <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                                  Chat Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>

        {/* meds */}
        <div className="w-full py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Featured Medicines
            </h2>
            <div className="px-4">
              <Slider {...settings_first}>
                {products.slice(0, 5).map((product, index) => (
                  <div key={index} className="px-2">
                    <MedCard
                      imageURL={product.imageURL}
                      name={product.name}
                      type={product.type}
                      balance={product.balance}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="mt-14 relative flex w-full bg-chooseus-back bg-cover md:min-h-[500px] min-h-[400px]">
          <img
            src="/doctor-bg.jpg"
            alt="popular"
            className="md:h-[500px] h-[400px] object-cover absolute w-full object-left-top"
          />
          <div className="h-full w-full absolute bg-black opacity-[0.7]"></div>
          <div className="flex absolute top-[50%] transform translate-x-[-52%] translate-y-[-50%] left-[50%] z-10 mx-auto flex-col lg:flex-row justify-center gap-12 md:gap-10 xl:gap-32 items-center max-w-[1216px] w-full">
            <div className="w-max mx-auto pl-[15px] text-white font-semibold lg:text-[40px] xl:text-[54px] md:text-[40px] md:leading-5 text-3xl lg:leading-[61px] xl:leading-[81px] tracking-[0.02em] lg:max-w-[140px]">
              Why<span className="text-[#DDA45C]"> Choose </span> Us ?
            </div>
            <div className="px-[10%] lg:px-0 flex flex-col md:gap-7 lg:gap-10 xl:gap-16 gap-5 sm:gap-7">
              {whychooseData.map((data, index) => (
                <div key={index} className="flex items-center md:gap-6 gap-3.5">
                  <div className="min-w-[40px]">
                    <img src={"/rightarrow.svg"} alt="arrow" />
                  </div>
                  <div className="lg:text-2xl xl:text-3xl sm:text-sm md:text-2xl text-start lg:leading-10 md:leading-7 text-sm leading-5 text-white font-medium">
                    {data}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              From Our Beloved Patients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {customer.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-199 p-8 rounded-xl hover:shadow-lg hover:shadow-violet-400 transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.cus_img}
                      alt={testimonial.cus_mainTitle}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">
                        {testimonial.cus_mainTitle}
                      </h4>
                      <p className="text-indigo-600">
                        {testimonial.cus_subTitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.cus_content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
