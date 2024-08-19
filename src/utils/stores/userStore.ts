import { create } from "zustand";

type StoreType = {
  userName: string;
  setUserName: (name: string) => void;
};

/**
 * BottomButtonLayout 에서 사용하는 Store
 */
export const useUserDataStore = create<StoreType>((set) => ({
  userName: "",
  setUserName: (name: string) => set({ userName: name }),
}));
