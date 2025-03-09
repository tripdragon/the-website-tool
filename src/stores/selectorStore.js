import { create } from "zustand";

export const useSelectorStore = create((set) => ({
  selectedElement: null,
  setSelectedElement: (element) => set({ selectedElement: element }),
}));
