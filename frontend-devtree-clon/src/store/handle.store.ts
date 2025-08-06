import { create } from "zustand";

interface HandleState {
  handle: string;

  setHandle: (handle: string) => void;
}

export const handleStore = create<HandleState>()((set) => ({
  handle: "",

  setHandle: (handle: string) => set({ handle }),
}));
