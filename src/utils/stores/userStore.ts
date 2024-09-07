import { create } from "zustand";

type StoreType = {
  userName: string;
  setUserName: (name: string) => void;
  location: { latitude: number; longitude: number; zoom: number };
  setLocation: (location: { latitude: number; longitude: number; zoom: number }) => void;
  mapCenter: { latitude: number; longitude: number; zoom: number };
  setMapCenter: (location: { latitude: number; longitude: number; zoom: number }) => void;
};

/**
 * BottomButtonLayout 에서 사용하는 Store
 */
export const useUserDataStore = create<StoreType>((set) => ({
  userName: "",
  setUserName: (name: string) => set({ userName: name }),
  location: { latitude: 37.5326, longitude: 127.024612, zoom: 14 },
  setLocation: (location: { latitude: number; longitude: number; zoom: number }) => set({ location }),
  mapCenter: { latitude: 37.5326, longitude: 127.024612, zoom: 14 },
  setMapCenter: (location: { latitude: number; longitude: number; zoom: number }) => set({ mapCenter: location }),
}));
