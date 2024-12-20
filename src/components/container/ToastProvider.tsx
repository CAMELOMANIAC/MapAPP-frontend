import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

import { MotionFragment } from "../../assets/styles/CommonStyle";
import ToastModal from "../../components/ui/ToastModal";
import { useToastStore } from "../../utils/stores/toastStore";

type ToastProviderProps = {
  children?: ReactNode;
};
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts, removeToast } = useToastStore((state) => ({
    toasts: state.ToastArray,
    removeToast: state.removeToast,
  }));

  return (
    <>
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
    </>
  );
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
