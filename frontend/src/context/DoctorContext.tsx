// src/context/DoctorContext.tsx
import React, { createContext, useContext, useState } from "react";

interface DoctorData {
  gender: string;
  dob: string;
  phone: string;

  specialization: string;
  university: string;
  licenseNo: string;
  qualification: string;
  yearsOfExperience: number;

  hospitalName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  fee: number;
  availableDays: string[];
  availableTimeSlots: string[];

  profilePicture: File | null;
  degreeCertificate: File | null;
  medicalLicense: File | null;
  idProof: File | null;

  name?: string;
  email?: string;
}

interface DoctorContextType {
  doctorData: DoctorData;
  updateDoctorData: (data: Partial<DoctorData>) => void;
  resetDoctorData: () => void;
}

const defaultDoctorData: DoctorData = {
  gender: "",
  dob: "",
  phone: "",

  specialization: "",
  university: "",
  licenseNo: "",
  qualification: "",
  yearsOfExperience: 0,

  hospitalName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",

  fee: 0,
  availableDays: [],
  availableTimeSlots: [],

  profilePicture: null,
  degreeCertificate: null,
  medicalLicense: null,
  idProof: null,

  name: "",
  email: "",
};

const DoctorContext = createContext<DoctorContextType>({
  doctorData: defaultDoctorData,
  updateDoctorData: () => {},
  resetDoctorData: () => {},
});

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctorData, setDoctorData] = useState<DoctorData>(defaultDoctorData);

  const updateDoctorData = (newData: Partial<DoctorData>) => {
    setDoctorData((prev) => ({ ...prev, ...newData }));
  };

  const resetDoctorData = () => {
    setDoctorData(defaultDoctorData);
  };

  return (
    <DoctorContext.Provider value={{ doctorData, updateDoctorData, resetDoctorData }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
