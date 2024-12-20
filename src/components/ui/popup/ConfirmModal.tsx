import React, { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import { usePopupModalStore } from "../../../utils/stores/popupStore";

type ConfirmModalProps = {
  children?: ReactNode;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

const ConfirmModal = ({ children, onClose, ...props }: ConfirmModalProps) => {
  const { confirmCallback } = usePopupModalStore((state) => ({ confirmCallback: state.confirmCallback }));
  return (
    <ConfirmModalContainer {...props}>
      <ModalMessageContainer>{children}</ModalMessageContainer>
      <ModalButtonContainer>
        <ConfirmButton onClick={confirmCallback}>예</ConfirmButton>
        <CloseButton onClick={onClose}>아니오</CloseButton>
      </ModalButtonContainer>
    </ConfirmModalContainer>
  );
};
export default ConfirmModal;

const ConfirmModalContainer = styled.div`
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
  width: 100%;
  padding: 3rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #f1f1f1;
  border: none;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: #f1f1f1;
  border: none;
`;
