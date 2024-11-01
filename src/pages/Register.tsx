import { useEffect, useState } from "react";
import RegisterProgress1 from "../components/RegisterProgress1";
import RegisterProgress2 from "../components/RegisterProgress2";
import AlertModal from "../components/AlertModal";
import { createPortal } from "react-dom";
import useAlertModal from "../utils/hooks/useAlertModal";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { isApple } from "../utils/functions/commons";
import { setBackForwardNavigationGestures } from "capacitor-plugin-ios-webview-configurator";

const Register = () => {
  const [progress, setProgress] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    isApple() && setBackForwardNavigationGestures(true);
    return () => {
      isApple() && setBackForwardNavigationGestures(false);
    };
  }, []);

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  const modalCloseHandler = () => {
    closeModal();
    setAlertMessage("");
  };
  useEffect(() => {
    if (alertMessage !== "") {
      openModal();
    }
  }, [alertMessage, openModal]);

  return (
    <PageContainer>
      <PageTitleH1>
        henmy 이용을 위해
        <br />
        회원가입을 진행해주세요
      </PageTitleH1>
      {progress === 0 && <RegisterProgress1 setAlertMessage={setAlertMessage} setProgress={setProgress} />}
      {progress === 1 && <RegisterProgress2 setAlertMessage={setAlertMessage} />}
      {createPortal(
        <AlertModal isOpen={isOpen} closeModal={modalCloseHandler}>
          {alertMessage}
        </AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default Register;
