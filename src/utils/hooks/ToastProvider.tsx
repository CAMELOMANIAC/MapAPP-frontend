import { AnimatePresence, motion } from "framer-motion";
import { createContext, ReactNode, useContext, useState } from "react";
import styled from "styled-components";

import { MotionFragment } from "../../assets/styles/CommonStyle";
import ToastModal from "../../components/ui/ToastModal";

type ToastProviderProps = {
  children?: ReactNode;
};
type ToastContextType = {
  removeToast: (id: number) => void;
  addToast: (message: ReactNode, type?: ToastMessageTypes, duration?: number) => void;
  ToastArray: ToastArray;
};
export type ToastMessageTypes = "success" | "error" | "info" | "warning";
type Toast = {
  id: number;
  message: ReactNode;
  type: ToastMessageTypes;
  duration: number;
  timerId: ReturnType<typeof setTimeout>;
};
type ToastArray = Toast[];

const ToastContext = createContext<ToastContextType | null>(null);

// 토스트 배열 식별 아이디 번호
let nextId = 0;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) =>
      prev.filter((toast) => {
        if (toast.id === id) {
          clearTimeout(toast.timerId);
        }
        return toast.id !== id;
      })
    );
  };
  const addToast = (message: ReactNode, type: ToastMessageTypes = "error", duration = 3000) => {
    const timerId: ReturnType<typeof setTimeout> = setTimeout(() => removeToast(newToast.id), duration);
    const newToast = { id: nextId++, message, type, duration, timerId };
    setToasts((prev) => [...prev, newToast]);
  };

  return (
    <ToastContext.Provider value={{ removeToast, addToast, ToastArray: toasts }}>
      {children}
      <ToastBackground>
        <AnimatePresence>
          {toasts.map((toastItem) => (
            <MotionFragment
              as={motion.div}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => removeToast(toastItem.id)}
              key={toastItem.id}
            >
              <ToastModal type={toastItem.type} duration={toastItem.duration}>
                {toastItem.message}
              </ToastModal>
            </MotionFragment>
          ))}
        </AnimatePresence>
      </ToastBackground>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("ToastProvider내부에서 useToast를 사용해야 합니다.");
  }
  return context;
};

const ToastBackground = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  pointer-events: none;
`;
