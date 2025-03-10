import { create } from "zustand";

export const useSelectorStore = create((set) => ({
  selectedElement: null,
  setSelectedElement: (element) => set({ selectedElement: element }),

  isSelectorActive: false,
  activateButton: () => set({ isSelectorActive: true }),
  deactivateButton: () => set({ isSelectorActive: false })


}));
