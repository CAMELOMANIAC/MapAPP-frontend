import { ButtonHTMLAttributes, useState } from "react";
import { MdOutlineAddLocation } from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import styled from "styled-components";

type WriteButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const WriteButton = ({ ...props }: WriteButtonProps) => {
  return (
    <ButtonContainer>
      <Button {...props}>
        <MdOutlineAddLocation />
      </Button>
      <DraggableIcon>
        <IoMdMove />
      </DraggableIcon>
    </ButtonContainer>
  );
};

export default WriteButton;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  bottom: 1rem;
  -webkit-user-drag: none;
  -moz-window-dragging: no-drag;
  cursor: "grab";
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background-color: white;
  border-radius: 100%;
  padding: 10px;
  color: var(--thema-color);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  -webkit-user-drag: none;
  -moz-window-dragging: no-drag;
  cursor: grab;
`;

const DraggableIcon = styled.div`
  position: absolute;
  font-size: 1.2rem;
  background-color: var(--thema-color);
  color: white;
  border-radius: 100%;
  top: 0%;
  left: 0%;
  width: 24px;
  height: 24px;
  transform: translate(50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-drag: none;
  -moz-window-dragging: no-drag;
`;
