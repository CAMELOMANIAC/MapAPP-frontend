import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export type LayoutButtonProps = {
  setButtonName: (name: string) => void;
  setButtonClickHandler: (handler: () => void) => void;
};

const BottomButtonLayout = () => {
  const [buttonName, setButtonName] = useState("Button");
  const [buttonClickHandler, setButtonClickHandler] = useState<() => void>(() => {});

  return (
    <Container>
      <Outlet context={{ setButtonName, setButtonClickHandler }} />
      <Button onClick={buttonClickHandler}>{buttonName}</Button>
    </Container>
  );
};

export default BottomButtonLayout;

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  border: 1px solid #000;
  margin-top: auto;
`;
