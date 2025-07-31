// import React, { useState, useEffect } from "react";
// import * as MdIcons from "react-icons/md";
// import { IconBaseProps } from "react-icons";
// import { fetchApprovedDoctors } from "../../apis/doctorApi";
// import { useNavigate } from "react-router-dom";

// const MdLocationOn = MdIcons.MdLocationOn as React.FC<IconBaseProps>;
// const MdSearch = MdIcons.MdSearch as React.FC<IconBaseProps>;

// interface CitySuggestion {
//   display_name: string;
//   lat: string;
//   lon: string;
// }

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   profileImage?: string;
// }

// const SearchBar = () => {
//   const [cityInput, setCityInput] = useState("");
//   const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const [searchInput, setSearchInput] = useState("");
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const data = await fetchApprovedDoctors();
//       const mappedDoctors = data.map((doc: any) => ({
//         _id: doc._id,
//         fullName: doc.name,
//         specialization: doc.professionalInfo?.specialization || "Not specified",
//         profileImage: doc.profilePicture || undefined,
//       }));
//       setDoctors(mappedDoctors);
//     };
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (cityInput.length < 2) {
//         setSuggestions([]);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${cityInput}&format=json&addressdetails=1`
//         );
//         const data = await response.json();
//         setSuggestions(data);
//         setShowSuggestions(true);
//       } catch (err) {
//         console.error("City suggestions error", err);
//       }
//     };

//     const timeout = setTimeout(fetchSuggestions, 300);
//     return () => clearTimeout(timeout);
//   }, [cityInput]);

//   const useCurrentLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );
//           const data = await res.json();
//           const city =
//             data?.address?.city || data?.address?.town || data?.address?.village;
//           if (city) {
//             setCityInput(city);
//             setShowSuggestions(false);
//           }
//         } catch (err) {
//           console.error("Reverse geocoding failed", err);
//         }
//       });
//     }
//   };

//   const handleCitySelect = (name: string) => {
//     setCityInput(name);
//     setShowSuggestions(false);
//   };

//   const handleSearch = () => {
//     const filtered = doctors.filter((doctor) =>
//       doctor.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
//       doctor.specialization.toLowerCase().includes(searchInput.toLowerCase())
//     );
//     setFilteredDoctors(filtered);
//   };

//   const goToDoctorProfile = (id: string) => {
//     navigate(`/doctor-profile/${id}`);
//   };

//   return (
//     <>
//       {/* Search Panel */}
//       <div className="w-full max-w-6xl mx-auto px-4 py-6">
//         <div className="bg-[#F0F4FF] rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">

//           {/* LEFT: City Search */}
//           <div className="relative w-full lg:w-1/3">
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
//               <MdLocationOn className="text-indigo-600 text-xl mr-2" />
//               <input
//                 type="text"
//                 value={cityInput}
//                 onChange={(e) => setCityInput(e.target.value)}
//                 onFocus={() => setShowSuggestions(true)}
//                 placeholder="Enter your city"
//                 className="w-full text-sm outline-none"
//               />
//             </div>

//             {showSuggestions && (suggestions.length > 0 || cityInput) && (
//               <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                 <div
//                   onClick={useCurrentLocation}
//                   className="cursor-pointer px-4 py-2 text-indigo-600 hover:bg-gray-100 text-sm font-medium"
//                 >
//                   📍 Use my location
//                 </div>
//                 {suggestions.map((sugg, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => handleCitySelect(sugg.display_name)}
//                     className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
//                   >
//                     {sugg.display_name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT: Search Input */}
//           <div className="flex w-full lg:w-2/3 items-center gap-2">
//             <div className="flex items-center w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
//               <MdSearch className="text-indigo-600 text-xl mr-2" />
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 placeholder="Search doctors by name or specialty..."
//                 className="w-full text-sm outline-none"
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-600 transition"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Filtered Results */}
//       {filteredDoctors.length > 0 && (
//         <div className="max-w-6xl mx-auto px-4 pb-12">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Results</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {filteredDoctors.map((doctor) => (
//               <div
//                 key={doctor._id}
//                 onClick={() => goToDoctorProfile(doctor._id)}
//                 className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
//               >
//                 <img
//                   src={
//                     doctor.profileImage
//                       ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
//                       : "/default-doctor.jpg"
//                   }
//                   onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
//                   alt={doctor.fullName}
//                   className="w-20 h-20 object-cover mx-auto rounded-full mb-3"
//                 />
//                 <h4 className="text-sm font-medium text-gray-900">{doctor.fullName}</h4>
//                 <p className="text-xs text-gray-600">{doctor.specialization}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import { fetchApprovedDoctors } from "../../apis/doctorApi";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  profileImage?: string;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 text-center transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
    <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
      <img
        src={
          doctor.profileImage
            ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
            : "/default-doctor.jpg"
        }
        onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
        alt={doctor.fullName}
        className="w-20 h-20 object-cover rounded-full"
      />
    </div>
    <h4 className="font-semibold text-gray-900 mt-4">{doctor.fullName}</h4>
    <p className="text-sm text-indigo-600 mt-1">{doctor.specialization}</p>
  </div>
);

const DoctorsGrid = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchApprovedDoctors();
      const mappedDoctors = data.map((doc: any) => ({
        _id: doc._id,
        fullName: doc.name,
        specialization: doc.professionalInfo?.specialization || "Not specified",
        profileImage: doc.profilePicture || undefined,
      }));
      setDoctors(mappedDoctors);
    };

    loadDoctors();
  }, []);

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => {
    const lower = searchTerm.toLowerCase();
    return (
      doctor.fullName.toLowerCase().includes(lower) ||
      doctor.specialization.toLowerCase().includes(lower)
    );
  });

  const visibleDoctors = filteredDoctors.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDoctors.length;

  return (
    <section className="py-10 px-4">
      <h3 className="text-center text-2xl font-bold mb-2">Top Doctors to Book</h3>
      <p className="text-center text-sm text-gray-500 mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* 🔍 Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or specialization"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(8); // Reset visible count on new search
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visibleDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/doctor-profile/${doctor._id}`)}
            className="cursor-pointer"
          >
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            className="bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-200 transition"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Show More
          </button>
        </div>
      )}

      <div className="h-16"></div>
    </section>
  );
};

export default DoctorsGrid;
