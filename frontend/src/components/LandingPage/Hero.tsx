import React, { useRef } from "react";
import SearchBar from "./SearchBar"; 

const Hero = () => {
  const searchBarRef = useRef<HTMLDivElement>(null);

  const scrollToSearchBar = () => {
    searchBarRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-start justify-between">
        {/* Left Text Section */}
        <div className="text-center lg:text-left max-w-xl space-y-6 z-10 lg:pl-10 mt-12 lg:mt-52">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Take Charge Of Your Health – Book Instantly.
          </h2>
          <p className="text-base text-gray-600">
            Your Health, Your Schedule. Secure Your Appointment Online In Minutes! Trusted
            Care, Seamless Booking – We're Here When You Need Us Most.
          </p>
          <button
            onClick={scrollToSearchBar}
            className="bg-indigo-500 text-white px-6 py-2 rounded-full"
          >
            Book appointment →
          </button>
        </div>

        {/* Right Side: Image and SVG */}
        <div className="relative w-[527px] h-[832px] flex items-end justify-center">
          <svg
            width="527"
            height="832"
            viewBox="0 0 520 548"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <path
              d="M371.861 69.4458C407.056 98.7392 437.929 129.716 463.554 167.091C489.178 204.802 510.172 248.91 517.273 297.732C524.374 346.555 517.582 399.754 497.205 447.903C477.138 495.716 437.796 488.481 395.5 507C363.5 529 316 548 263.5 548C214 548 182 545 139 522C102 490.5 41.5208 478.544 18.9835 441.506C-3.86244 404.468 0.151041 348.912 0.459771 293.355C0.7685 238.135 -2.62753 182.579 14.97 136.114C32.5676 89.6481 71.1588 52.2738 114.998 28.3677C158.838 4.46155 208.235 -5.63964 252.692 3.11472C297.149 12.2058 336.666 40.1524 371.861 69.4458Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="260"
                y1="0"
                x2="260"
                y2="548"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3C96FF" />
                <stop offset="1" stopColor="#5F6FFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <img
            src="/upscalemedia-transformed.png"
            alt="Doctor"
            className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-140px] w-[527px] h-[832px] object-contain"
          />
        </div>
      </div>

      {/* SearchBar with scroll target */}
      <div ref={searchBarRef}>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
