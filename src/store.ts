import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DraftPacient, Pacient } from "./types";
import { v4 as uuidV4 } from "uuid";
import { persist } from "zustand/middleware";
type PatientState = {
  patients: Pacient[];
  activedId: Pacient["id"];
  addPacient: (data: DraftPacient) => void;
  deletePatient: (id: Pacient["id"]) => void;
  getPatientById: (id: Pacient["id"]) => void;
  updatePatient: (data: DraftPacient) => void;
};

const createPatient = (patient: DraftPacient): Pacient => {
  return { ...patient, id: uuidV4() };
};
export const usePacientStore = create<PatientState>()(
  devtools(persist((set) => ({
    patients: [],
    activedId: "",

    addPacient: (data) => {
      const newPatient = createPatient(data);
      set((state) => ({
        patients: [...state.patients, newPatient],
      }));
    },
    deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    },
    getPatientById: (id) => {
      set(() => ({
        activedId: id,
      }));
    },
    updatePatient: (data) => {
      set((state) => ({
        patients: state.patients.map(patient => patient.id === state.activedId ? {id: state.activedId, ...data} : patient)
      }));
    },
  }),{
    name :'pacient-storage'
  }))
);
