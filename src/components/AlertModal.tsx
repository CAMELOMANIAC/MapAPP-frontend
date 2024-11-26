import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

type ModalBackgroundProps = {
  $visible: boolean;
};

const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 50%);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  background: white;
`;

const ModalMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
