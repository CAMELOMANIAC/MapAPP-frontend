import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { LayoutButtonProps } from "../components/layouts/BottomButtonLayout";
const AccountRecovery = () => {
  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();

  useEffect(() => {
    setButtonName("확인");
    setButtonClickHandler(() => {
      console.log("Account Recovery Button Clicked");
    });
  }, [setButtonName, setButtonClickHandler]);
  return <div></div>;
};

export default AccountRecovery;
