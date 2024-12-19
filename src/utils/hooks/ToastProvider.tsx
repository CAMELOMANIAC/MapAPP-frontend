import { AnimatePresence, motion } from "framer-motion";
import { createContext, ReactNode, useContext, useState } from "react";
import styled from "styled-components";

type ToastProviderProps = {
  children?: ReactNode;
};
type ToastContextType = {
  removeToast: (id: number) => void;
  addToast: (message: string | ReactNode, duration?: number) => void;
  ToastArray: ToastArray;
};
type Toast = { id: number; message: ReactNode };
type ToastArray = Toast[];

const ToastContext = createContext<ToastContextType | null>(null);

// 토스트 배열 식별 아이디 번호
let nextId = 0;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  const addToast = (message: string | ReactNode, duration = 3000) => {
    const newToast = { id: nextId++, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(newToast.id), duration);
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
              <ToastContainer>{toastItem.message}</ToastContainer>
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
`;

const ToastContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 100px;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
`;

const MotionFragment = styled(motion.div)`
  display: inherit;
  width: 100%;
`;
