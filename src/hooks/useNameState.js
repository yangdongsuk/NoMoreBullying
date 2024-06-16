import { create } from "zustand";
const useNameState = create((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));

export default useNameState;
