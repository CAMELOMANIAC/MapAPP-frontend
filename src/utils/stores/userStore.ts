import { create } from "zustand";

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type StoreType = {
  userName: string;
  setUserName: (name: string) => void;
  location: LocationType;
  setLocation: (location: LocationType) => void;
  mapCenter: LocationType;
  setMapCenter: (location: LocationType) => void;
};

/**
 * BottomButtonLayout 에서 사용하는 Store
 */
export const useUserDataStore = create<StoreType>((set) => ({
  userName: "",
  setUserName: (name: string) => set({ userName: name }),
  location: { latitude: 37.5326, longitude: 127.024612, zoom: 14 },
  setLocation: (location: LocationType) => set({ location }),
  mapCenter: { latitude: 37.5326, longitude: 127.024612, zoom: 14 },
  setMapCenter: (location: LocationType) => set({ mapCenter: location }),
}));
