import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

type ModalBackgroundProps = {
  $visible: boolean;
};

const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 80%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

type Props = {
  children: ReactNode;
  isOpen: boolean;
  closeModal: MouseEventHandler;
};

const AlertModal = ({ children, isOpen, closeModal }: Props) => {
  return (
    <ModalBackground onClick={closeModal} $visible={isOpen}>
      <ModalContainer>
        <ModalMessageContainer>{children}</ModalMessageContainer>
        <ModalButtonContainer>
          <button onClick={closeModal}>확인</button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AlertModal;
