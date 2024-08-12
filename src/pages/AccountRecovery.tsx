import { useEffect } from "react";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
const AccountRecovery = () => {
  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  useEffect(() => {
    setButtonName("확인");
    setButtonClickHandler(() => {
      console.log("Account Recovery Button Clicked");
    });
  }, [setButtonName, setButtonClickHandler]);
  return <div></div>;
};

export default AccountRecovery;
