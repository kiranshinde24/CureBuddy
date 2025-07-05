import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Section: About Us Header */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold tracking-wide">ABOUT US</h2>
      </section>

      {/* Section: Welcome and Vision */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 mb-16">
        {/* Left Image */}
        <img
          src="/Doctor Team.jpg"
          alt="Doctors"
          className="w-1/3 rounded-xl shadow-lg object-cover"
        />

        {/* Right Text */}
        <div className="md:w-1/2 text-justify">
          <h3 className="text-xl font-bold mb-2">Welcome To CureBuddy</h3>
          <p className="mb-4 leading-relaxed">
            Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently. At CureBuddy,
            We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And
            Monitoring Their Health. That’s Why We’ve Created A Smart, User-Friendly Platform To Simplify Your Healthcare Journey.
          </p>
          <p className="mb-4 leading-relaxed">
            Driven By Our Commitment To Innovation In Healthcare Technology, We Continuously Work To Enhance
            Our Platform By Integrating The Latest Technologies To Improve User Experience And Deliver Top-Tier Service.
            Whether It’s Booking Appointments Or Managing Long-Term Care, CureBuddy Strives To Support Your Wellness Every Step Of The Way.
          </p>

          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="leading-relaxed">
            At CureBuddy, Our Vision Is To Build A Seamless, Accessible Healthcare Experience For Every User.
            We Aim To Bridge The Gap Between Patients And Healthcare Providers, Making It Easier For You To Get The Care You Need – Whenever And Wherever You Need It.
          </p>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="py-10 px-6 md:px-20 bg-white">
        <h3 className="text-center text-2xl font-semibold mb-8">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-bold text-lg mb-2">EFFICIENCY</h4>
            <p>Streamlined Appointment Scheduling That Fits Into Your Day, Lifestyle.</p>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-bold text-lg mb-2">CONVENIENCE</h4>
            <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-bold text-lg mb-2">PERSONALIZATION</h4>
            <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
      </section>

      {/* Section: Mission Statement */}
      <section className="bg-blue-50 py-14 px-6 md:px-20 text-center">
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          We are committed to empowering individuals to take control of their health through technology.
          By building accessible tools, we aim to connect people with the right care at the right time—
          while keeping it simple, secure, and efficient.
        </p>
      </section>
      {/* Add white space */}
      <div className="h-100"></div>
    </div>
  );
};

export default AboutUs;
