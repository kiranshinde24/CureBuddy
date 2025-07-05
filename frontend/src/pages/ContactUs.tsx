import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex-grow">
        <h2 className="text-center text-2xl font-semibold mb-12">
          CONTACT <span className="text-black font-bold">US</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/ContactUs.jpg"
            alt="Contact"
            className="rounded-md w-full max-w-[350px] h-auto mx-auto shadow-lg"
          />

          <div className="space-y-6 text-base">
            <div>
              <h3 className="font-semibold text-lg">OUR OFFICE</h3>
              <p className="text-sm mt-1">Alandi, Pune, Maharashtra, India – 412105</p>
              <p className="text-sm mt-1">Tel: (+91) 555-0132</p>
              <p className="text-sm mt-1">Email: curebuddy4u@gmail.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">CAREERS AT CUREBUDDY</h3>
              <p className="text-sm mt-1">
                Learn more about our teams and job openings.
              </p>
              <button className="mt-2 px-4 py-2 bg-gray-100 border border-gray-400 rounded text-sm hover:bg-gray-200">
                Explore Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extra white space to match Landing Page height */}
      <div className="h-48"></div>
    </div>
  );
};

export default ContactUs;
