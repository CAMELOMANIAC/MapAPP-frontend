import { ReactNode } from "react";
import { create } from "zustand";

export type ToastMessageTypes = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  message: ReactNode;
  type: ToastMessageTypes;
  duration: number;
  timerId: ReturnType<typeof setTimeout>;
};

type ToastArray = Toast[];

type ToastState = {
  ToastArray: ToastArray;
  addToast: (message: ReactNode, type?: ToastMessageTypes, duration?: number) => void;
  removeToast: (id: number) => void;
};

// 토스트 식별 아이디 번호(addToast 함수 호출시마다 증가)
let nextId = 0;

export const useToastStore = create<ToastState>((set) => ({
  ToastArray: [],
  addToast: (message, type = "info", duration = 3000) => {
    const id = nextId++;
    const timerId = setTimeout(() => {
      set((state) => ({
        ToastArray: state.ToastArray.filter((toast) => toast.id !== id),
      }));
    }, duration);

    set((state) => ({
      ToastArray: [...state.ToastArray, { id, message, type, duration, timerId }],
    }));
  },
  removeToast: (id) => {
    set((state) => {
      const toastToRemove = state.ToastArray.find((toast) => toast.id === id);
      if (toastToRemove) {
        clearTimeout(toastToRemove.timerId);
      }
      return {
        ToastArray: state.ToastArray.filter((toast) => toast.id !== id),
      };
    });
  },
}));
