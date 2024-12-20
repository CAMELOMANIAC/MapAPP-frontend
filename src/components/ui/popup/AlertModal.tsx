import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type AlertModalProps = {
  children?: ReactNode;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

const AlertModal = ({ children, onClose, ...props }: AlertModalProps) => {
  return (
    <AlertModalContainer {...props}>
      <ModalMessageContainer>{children}</ModalMessageContainer>
      <ModalButtonContainer>
        <button onClick={onClose}>확인</button>
      </ModalButtonContainer>
    </AlertModalContainer>
  );
};

export default AlertModal;

const AlertModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
  pointer-events: auto;
  background: white;
`;

const ModalMessageContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
