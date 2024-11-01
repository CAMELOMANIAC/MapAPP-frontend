import { useEffect, useState } from "react";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import RegisterProgress1 from "../components/RegisterProgress1";
import { useForm } from "react-hook-form";
import useAlertModal from "../utils/hooks/useAlertModal";
import { createPortal } from "react-dom";
import AlertModal from "../components/AlertModal";
import { getErrors } from "../utils/functions/commons";
import { useOutletContext } from "react-router-dom";
import { LayoutButtonProps } from "../components/BottomButtonLayout";

export type FormType = {
  name: string;
  birthDay: number;
  gender: number;
  emailLocal: string;
  emailDomain: string;
  authNumber: number;
  [key: string]: string | number;
};

const IdRecovery = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();
  useEffect(() => {
    setButtonClickHandler(() => {});
  }, [setButtonClickHandler]);

  useEffect(() => {
    setButtonName("아이디 찾기");
    if (isAuth) {
      setButtonClickHandler(() => handleSubmit(onSubmit));
    }
  }, [isAuth]); // eslint-disable-line react-hooks/exhaustive-deps

  //RegisterProgress1을 위한 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  //아이디 찾기 버튼 클릭시
  const onSubmit = (data: FormType) => {
    console.log(data);
    setAlertMessage("아이디는\n가나다\n입니다.");
  };

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  const modalCloseHandler = () => {
    closeModal();
    setAlertMessage("");
  };
  useEffect(() => {
    if (getErrors(errors) !== "") {
      setAlertMessage(getErrors(errors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors.name?.message,
    errors.birthDay?.message,
    errors.gender?.message,
    errors.emailDomain?.message,
    errors.emailLocal?.message,
  ]);

  useEffect(() => {
    if (alertMessage !== "") {
      openModal();
    }
  }, [alertMessage, openModal]);

  return (
    <PageContainer>
      <PageTitleH1>
        Henmy 아이디를 찾기위해
        <br />
        본인인증을 진행해주세요
      </PageTitleH1>

      <RegisterProgress1 setAlertMessage={setAlertMessage} />

      {createPortal(
        <AlertModal isOpen={isOpen} closeModal={modalCloseHandler}>
          {alertMessage}
        </AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default IdRecovery;
