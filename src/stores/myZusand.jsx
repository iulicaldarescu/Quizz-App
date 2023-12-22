import { create } from "zustand";

const useStore = create((set) => ({
  subjectObject: { id: "", title: "", icon: "", questions: [] },
  setSubjectObject: (state) => set({ subjectObject: state }),
}));

export default useStore;
