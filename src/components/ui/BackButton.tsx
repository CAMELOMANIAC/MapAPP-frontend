import { HTMLAttributes } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type BackButtonProps = {} & HTMLAttributes<HTMLButtonElement>;

const BackButton = ({ ...props }: BackButtonProps) => {
  const navigate = useNavigate();
  const pageBackButtonHandler = () => {
    navigate(-1);
  };
  return (
    <StyledButton onClick={pageBackButtonHandler} {...props}>
      <IoIosArrowBack />
    </StyledButton>
  );
};

export default BackButton;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0.3rem;
`;
