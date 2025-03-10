import { create } from "zustand";

export const useSelectorStore = create((set) => ({
  selectedElement: null,
  setSelectedElement: (element) => set({ selectedElement: element }),

  isSelectorActive: false,
  activateSelectorButton: () => set({ isSelectorActive: true }),
  deactivateSelectorButton: () => set({ isSelectorActive: false }),

  isStyleEditorActive: false,
  activateStyleEditorButton: () => set({ isStyleEditorActive: true }),
  deactivateStyleEditorButton: () => set({ isStyleEditorActive: false })


}));
