import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import ChangePwdProgress from "../components/container/ChangePwdProgress";
import RegisterProgress1 from "../components/container/RegisterProgress1";
import { LayoutButtonProps } from "../components/layouts/BottomButtonLayout";
import AlertModal from "../components/ui/AlertModal";
import { getErrors } from "../utils/functions/commons";
import useAlertModal from "../utils/hooks/useAlertModal";

export type FormType = {
  name: string;
  birthDay: number;
  gender: number;
  emailLocal: string;
  emailDomain: string;
  authNumber: number;
  [key: string]: string | number;
};

export type ChangePwdFormType = {
  pwd: string;
  pwdCheck: string;
};

const IdRecovery = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [progress, setProgress] = useState(0);

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();
  useEffect(() => {
    setButtonClickHandler(() => {});
  }, [setButtonClickHandler]);

  useEffect(() => {
    if (progress === 0) {
      setButtonName("본인인증 하기");
      if (isAuth) {
        setButtonClickHandler(() => handleSubmit(onSubmit));
      }
    } else if (progress === 1) {
      setButtonName("비밀번호 재설정");
      setButtonClickHandler(() => handleSubmit(changePwdonSubmit));
    }
  }, [progress, isAuth]); // eslint-disable-line react-hooks/exhaustive-deps

  //RegisterProgress1을 위한 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  //ChangePwdProgress를 위한 useForm
  const {
    register: changePwdregister,
    handleSubmit: changePwdhandleSubmit,
    formState: { errors: changePwderrors },
    getValues,
  } = useForm<ChangePwdFormType>({ mode: "onSubmit" });

  //아이디 찾기 버튼 클릭시
  const onSubmit = (data: FormType) => {
    console.log(data);
    if (progress === 0) {
      setProgress(1);
    }
  };

  //아이디 찾기 버튼 클릭시
  const changePwdonSubmit = (data: FormType) => {
    if (progress === 1) {
      console.log(data);
      openModal();
    }
  };

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  const modalCloseHandler = () => {
    closeModal();
    setAlertMessage("");
  };
  useEffect(() => {
    if (getErrors(errors) !== "" || getErrors(changePwderrors) !== "") {
      setAlertMessage(getErrors(errors) !== "" ? getErrors(errors) : getErrors(changePwderrors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors.name?.message,
    errors.birthDay?.message,
    errors.gender?.message,
    errors.emailDomain?.message,
    errors.emailLocal?.message,
    changePwderrors.pwd?.message,
    changePwderrors.pwdCheck?.message,
  ]);

  return (
    <PageContainer>
      {progress === 0 ? (
        <>
          <PageTitleH1>Henmy 비밀번호를 찾을게요</PageTitleH1>
          <RegisterProgress1 setAlertMessage={setAlertMessage} setProgress={setProgress} />
        </>
      ) : (
        <>
          <PageTitleH1>
            님 안녕하세요
            <br />
            비밀번호를 다시 설정할게요
          </PageTitleH1>

          <ChangePwdProgress
            errors={changePwderrors}
            getValues={getValues}
            handleSubmit={changePwdhandleSubmit}
            onSubmit={changePwdonSubmit}
            register={changePwdregister}
          />
        </>
      )}
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
