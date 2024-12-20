import { ButtonHTMLAttributes } from "react";
import { IoMdMove } from "react-icons/io";
import { MdOutlineAddLocation } from "react-icons/md";
import styled from "styled-components";

type MarkerDraggableButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const MarkerDraggableButton = ({ ...props }: MarkerDraggableButtonProps) => {
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

export default MarkerDraggableButton;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  position: absolute;
  padding: 10px;
  font-size: 3rem;
  color: var(--thema-color);
  cursor: grab;
  background-color: white;
  border-radius: 100%;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 30%);
  -webkit-user-drag: none;
  -moz-window-dragging: no-drag;
`;

const DraggableIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 1.2rem;
  color: white;
  background-color: var(--thema-color);
  border-radius: 100%;
  transform: translate(-100%, -100%);
  -webkit-user-drag: none;
`;
