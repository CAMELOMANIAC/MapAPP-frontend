import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: auto;
  border: 1px solid #000;
`;
