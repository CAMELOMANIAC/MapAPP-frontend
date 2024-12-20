import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

import { MotionFragment } from "../../assets/styles/CommonStyle";
import { usePopupModalStore } from "../../utils/stores/popupStore";
import PopupModal from "../ui/popup/PopupModal";

type PopupProviderProps = {
  children?: ReactNode;
};

const PopupProvider = ({ children }: PopupProviderProps) => {
  const { content, isOpen, type, closePopup } = usePopupModalStore((state) => ({
    content: state.content,
    isOpen: state.isOpen,
    type: state.type,
    closePopup: state.closePopup,
  }));

  return (
    <>
      {children}
      <AnimatePresence>
        {isOpen && (
          <MotionFragment
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopupBackground $isOpen={isOpen}>
              <MotionFragmentCenter
                as={motion.div}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <PopupModal type={type} onClose={closePopup}>
                  {content}
                </PopupModal>
              </MotionFragmentCenter>
            </PopupBackground>
          </MotionFragment>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupProvider;

const PopupBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.$isOpen ? "rgb(0 0 0 / 20%)" : "transparent")};
`;

const MotionFragmentCenter = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
