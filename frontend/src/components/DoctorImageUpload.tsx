import React, { useRef, useState } from "react";

const DoctorImageUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  return (
    
    <div className="flex flex-col items-center mb-6">
  <div
    className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-5xl mb-2 overflow-hidden cursor-pointer border-2 border-gray-300"
    onClick={() => fileInputRef.current?.click()}
  >
    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <>👤</>
    )}
  </div>

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    className="hidden"
    onChange={handleImageChange}
  />

  <span className="text-xl font-bold text-gray-700">Upload Image</span>

</div>

  );
};

export default DoctorImageUpload;
