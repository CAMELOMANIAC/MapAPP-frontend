import { setBackForwardNavigationGestures } from "capacitor-plugin-ios-webview-configurator";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import RegisterProgress1 from "../components/container/RegisterProgress1";
import RegisterProgress2 from "../components/container/RegisterProgress2";
import AlertModal from "../components/ui/AlertModal";
import BackButton from "../components/ui/BackButton";
import { isApple } from "../utils/functions/commons";
import useAlertModal from "../utils/hooks/useAlertModal";
import { usePopupModalStore } from "../utils/stores/popupStore";

const Register = () => {
  const [progress, setProgress] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const { openPopup } = usePopupModalStore((state) => ({ openPopup: state.openPopup }));

  useEffect(() => {
    if (isApple()) {
      setBackForwardNavigationGestures(true);
    }
    openPopup(
      "테스트",
      "alert",
      () => console.log("테스트콘솔"),
      () => console.log("테스트콘솔2")
    );
    return () => {
      if (isApple()) {
        setBackForwardNavigationGestures(false);
      }
    };
  }, []); //eslint-disable-line

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
        <BackButton />
        빵뎅이 이용을 위해
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
