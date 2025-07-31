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

// import React, { useState, useEffect } from "react";
// import * as MdIcons from "react-icons/md";
// import { IconBaseProps } from "react-icons";
// import { fetchApprovedDoctors } from "../../apis/doctorApi";
// import { useNavigate } from "react-router-dom";

// const MdLocationOn = MdIcons.MdLocationOn as React.FC<IconBaseProps>;
// const MdSearch = MdIcons.MdSearch as React.FC<IconBaseProps>;

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   profileImage?: string;
//   city?: string;
// }

// const SearchBar = () => {
//   const [cityInput, setCityInput] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[] | null>(null);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const data = await fetchApprovedDoctors();
//       const mappedDoctors = data.map((doc: any) => ({
//         _id: doc._id,
//         fullName: doc.name,
//         specialization: doc.professionalInfo?.specialization || "Not specified",
//         profileImage: doc.profilePicture || undefined,
//         city: doc.hospitalInfo?.city?.toLowerCase() || "",
//       }));
//       setDoctors(mappedDoctors);
//     };
//     fetchDoctors();
//   }, []);

//   // 🔍 Autocomplete suggestions
//   useEffect(() => {
//     if (!searchInput) {
//       setSuggestions([]);
//       return;
//     }
//     const input = searchInput.toLowerCase();
//     const matches = new Set<string>();
//     doctors.forEach((doc) => {
//       if (doc.fullName.toLowerCase().includes(input)) {
//         matches.add(doc.fullName);
//       }
//       if (doc.specialization.toLowerCase().includes(input)) {
//         matches.add(doc.specialization);
//       }
//     });
//     setSuggestions([...matches].slice(0, 6)); // limit suggestions
//   }, [searchInput, doctors]);

//   const handleSearch = (term = searchInput) => {
//     const filtered = doctors.filter((doctor) => {
//       const matchesSearch =
//         doctor.fullName.toLowerCase().includes(term.toLowerCase()) ||
//         doctor.specialization.toLowerCase().includes(term.toLowerCase());
//       const matchesCity = doctor.city.includes(cityInput.toLowerCase());
//       return matchesSearch && matchesCity;
//     });
//     setFilteredDoctors(filtered);
//     setSuggestions([]);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleSuggestionClick = (value: string) => {
//     setSearchInput(value);
//     handleSearch(value);
//   };

//   const goToDoctorProfile = (id: string) => {
//     navigate(`/doctor-profile/${id}`);
//   };

//   return (
//     <>
//       {/* Search Panel */}
//       <div className="w-full max-w-6xl mx-auto px-4 py-6">
//         <div className="bg-[#F0F4FF] rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
//           {/* LEFT: City Input */}
//           <div className="relative w-full lg:w-1/3">
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
//               <MdLocationOn className="text-indigo-600 text-xl mr-2" />
//               <input
//                 type="text"
//                 value={cityInput}
//                 onChange={(e) => setCityInput(e.target.value)}
//                 placeholder="Enter your city"
//                 className="w-full text-sm outline-none"
//                 onKeyDown={handleKeyPress}
//               />
//             </div>
//           </div>

//           {/* RIGHT: Search Input */}
//           <div className="relative w-full lg:w-2/3">
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
//               <MdSearch className="text-indigo-600 text-xl mr-2" />
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 placeholder="Search doctors by name or specialty..."
//                 className="w-full text-sm outline-none"
//                 onKeyDown={handleKeyPress}
//               />
//             </div>

//             {/* Autocomplete Dropdown */}
//             {suggestions.length > 0 && (
//               <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
//                 {suggestions.map((sugg, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleSuggestionClick(sugg)}
//                     className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//                   >
//                     {sugg}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Filtered Results */}
//       {filteredDoctors && (
//         <div className="max-w-6xl mx-auto px-4 pb-12">
//           {filteredDoctors.length > 0 ? (
//             <>
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Results</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {filteredDoctors.map((doctor) => (
//                   <div
//                     key={doctor._id}
//                     onClick={() => goToDoctorProfile(doctor._id)}
//                     className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
//                   >
//                     <img
//                       src={
//                         doctor.profileImage
//                           ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
//                           : "/default-doctor.jpg"
//                       }
//                       onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
//                       alt={doctor.fullName}
//                       className="w-20 h-20 object-cover mx-auto rounded-full mb-3"
//                     />
//                     <h4 className="text-sm font-medium text-gray-900">{doctor.fullName}</h4>
//                     <p className="text-xs text-gray-600">{doctor.specialization}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-600 text-sm mt-8">Doctor not found</p>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import * as MdIcons from "react-icons/md";
import { IconBaseProps } from "react-icons";
import { fetchApprovedDoctors } from "../../apis/doctorApi";
import { useNavigate } from "react-router-dom";

const MdLocationOn = MdIcons.MdLocationOn as React.FC<IconBaseProps>;
const MdSearch = MdIcons.MdSearch as React.FC<IconBaseProps>;

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  profileImage?: string;
  city?: string;
}

const SearchBar = () => {
  const [cityInput, setCityInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[] | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const navigate = useNavigate();

  // 🔁 Fetch doctors on load
  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await fetchApprovedDoctors();
      const mappedDoctors = data.map((doc: any) => ({
        _id: doc._id,
        fullName: doc.name,
        specialization: doc.professionalInfo?.specialization || "Not specified",
        profileImage: doc.profilePicture || undefined,
        city: doc.hospitalInfo?.city?.toLowerCase() || "",
      }));
      setDoctors(mappedDoctors);
      setFilteredDoctors(null); // default to all
    };
    fetchDoctors();
  }, []);

  // 🔄 Reset to full list when inputs cleared
  useEffect(() => {
    if (!searchInput.trim() && !cityInput.trim()) {
      setFilteredDoctors(null); // null = show all
      setSuggestions([]);
    }
  }, [searchInput, cityInput]);

  // 🔍 Autocomplete suggestions
  useEffect(() => {
    if (!searchInput) {
      setSuggestions([]);
      return;
    }
    const input = searchInput.toLowerCase();
    const matches = new Set<string>();
    doctors.forEach((doc) => {
      if (doc.fullName.toLowerCase().includes(input)) {
        matches.add(doc.fullName);
      }
      if (doc.specialization.toLowerCase().includes(input)) {
        matches.add(doc.specialization);
      }
    });
    setSuggestions([...matches].slice(0, 6)); // max 6
  }, [searchInput, doctors]);

  const handleSearch = (term = searchInput) => {
    const nameOrSpecialty = term.toLowerCase();
    const city = cityInput.toLowerCase();

    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullName.toLowerCase().includes(nameOrSpecialty) ||
        doctor.specialization.toLowerCase().includes(nameOrSpecialty);
      const matchesCity = doctor.city.includes(city);
      return matchesSearch && matchesCity;
    });

    setFilteredDoctors(filtered);
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (value: string) => {
    setSearchInput(value);
    handleSearch(value);
  };

  const goToDoctorProfile = (id: string) => {
    navigate(`/doctor-profile/${id}`);
  };

  return (
    <>
      {/* Search Panel */}
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="bg-[#F0F4FF] rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* LEFT: City Input */}
          <div className="relative w-full lg:w-1/3">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <MdLocationOn className="text-indigo-600 text-xl mr-2" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter your city"
                className="w-full text-sm outline-none"
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>

          {/* RIGHT: Search Input */}
          <div className="relative w-full lg:w-2/3">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <MdSearch className="text-indigo-600 text-xl mr-2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search doctors by name or specialty..."
                className="w-full text-sm outline-none"
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* Autocomplete Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((sugg, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(sugg)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                  >
                    {sugg}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtered Results */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {(filteredDoctors ?? doctors).length > 0 ? (
          <>
            {filteredDoctors && (
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Search Results
              </h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(filteredDoctors ?? doctors).map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() => goToDoctorProfile(doctor._id)}
                  className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
                >
                  <img
                    src={
                      doctor.profileImage
                        ? `${import.meta.env.VITE_API_URL}/uploads/${doctor.profileImage}`
                        : "/default-doctor.jpg"
                    }
                    onError={(e) =>
                      (e.currentTarget.src = "/default-doctor.jpg")
                    }
                    alt={doctor.fullName}
                    className="w-20 h-20 object-cover mx-auto rounded-full mb-3"
                  />
                  <h4 className="text-sm font-medium text-gray-900">
                    {doctor.fullName}
                  </h4>
                  <p className="text-xs text-gray-600">{doctor.specialization}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-sm mt-8">Doctor not found</p>
        )}
      </div>
    </>
  );
};

export default SearchBar;

