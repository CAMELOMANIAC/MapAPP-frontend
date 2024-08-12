import { Outlet } from "react-router-dom";
import { create } from "zustand";
import styled from "styled-components";

type StoreType = {
  buttonName: string;
  setButtonName: (name: string) => void;
  buttonClickHandler: () => void;
  setButtonClickHandler: (handler: () => void) => void;
};

/**
 * BottomButtonLayout 에서 사용하는 Store
 */
export const useBottomButtonLayoutStore = create<StoreType>((set) => ({
  buttonName: "Button",
  setButtonName: (name: string) => set({ buttonName: name }),
  buttonClickHandler: () => {},
  setButtonClickHandler: (handler: () => void) => set({ buttonClickHandler: handler }),
}));

const BottomButtonLayout = () => {
  const { buttonName, buttonClickHandler } = useBottomButtonLayoutStore((state) => ({
    buttonName: state.buttonName,
    buttonClickHandler: state.buttonClickHandler,
  }));

  return (
    <Container>
      <Outlet />
      <Button onClick={buttonClickHandler}>{buttonName}</Button>
    </Container>
  );
};

export default BottomButtonLayout;

const Container = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
