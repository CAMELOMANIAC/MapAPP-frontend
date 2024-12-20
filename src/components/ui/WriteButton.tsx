import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

type WriteButtonProps = { isVisible: boolean } & LinkProps;

const WriteButton = ({ isVisible, ...props }: WriteButtonProps) => {
  return (
    <ButtonContainer $isVisible={isVisible}>
      <Button {...props}>작성하기</Button>
    </ButtonContainer>
  );
};

export default WriteButton;

const Button = styled(Link)`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  overflow: hidden;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--thema-color);
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 30%);
`;

const ButtonContainer = styled.div<{ $isVisible: boolean }>`
  position: relative;
  flex: ${(props) => (props.$isVisible ? 1 : 0)};
  padding: 10px;
  overflow: hidden;
  transition: all 1s;
`;
