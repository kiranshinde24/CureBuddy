const CTA = () => {
  return (
    <section className="relative bg-indigo-500 text-white px-8 py-10 flex items-end justify-between rounded-xl w-[1200px] h-[320px] mx-auto my-10 overflow-visible">
      {/* Left Text Section */}
      <div className="z-10">
        <h3 className="text-3xl font-bold max-w-md">
          Book Appointment With 100+ Trusted Doctors
        </h3>
        <button className="mt-4 px-5 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium">
          Create account
        </button>
      </div>

      {/* Image Positioned Absolutely with Downward Offset */}
      <div className="relative w-[500px] h-[0px] flex items-end justify-end">
        <img
          src="/CTA-girls.png"
          alt="doctor"
          className="absolute bottom-0 right-0 w-[500px] h-[500px] object-contain translate-y-10" 
        />
      </div>
    </section>
  );
};

export default CTA;
