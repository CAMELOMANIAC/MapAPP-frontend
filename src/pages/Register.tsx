import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import RegisterProgress1 from "../components/RegisterProgress1";
import RegisterProgress2 from "../components/RegisterProgress2";
import AlertModal from "../components/AlertModal";
import { createPortal } from "react-dom";
import useAlertModal from "../utils/hooks/useAlertModal";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { getErrors } from "../utils/functions/commons";
import { useNavigate, useOutletContext } from "react-router-dom";
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

export type FormTypeSecond = {
  id: string;
  nickName: string;
  pwd: string;
  pwdCheck: string;
  [key: string]: string;
};

const Register = () => {
  const [progress, setProgress] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();
  useEffect(() => {
    setButtonClickHandler(() => {});
  }, [setButtonClickHandler]);

  //다음으로
  const onSubmit = (data: FormType) => {
    console.log(data);
    if (isAuth) setProgress(1);
    else {
      setAlertMessage("본인인증을 진행해주세요");
    }
  };

  //회원가입
  const onSubmitSecond = (data: FormTypeSecond) => {
    console.log("실행은되나요?", nickName);
    if (nickName) {
      console.log("왜실행이안되지", data);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (progress === 0) {
      setButtonName("다음");
      setButtonClickHandler(() => handleSubmit(onSubmit));
    } else if (progress === 1) {
      setButtonName("회원가입");
      setButtonClickHandler(() => handleSubmitSecond(onSubmitSecond));
    }
  }, [progress, isAuth, setButtonName, setButtonClickHandler, id, nickName]); //eslint-disable-line

  //RegisterProgress1을 위한 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  //RegisterProgress2을 위한 useForm
  const {
    register: registerSecond,
    handleSubmit: handleSubmitSecond,
    formState: { errors: errorsSecond },
    getValues,
  } = useForm<FormTypeSecond>({ mode: "onSubmit" });

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  const modalCloseHandler = () => {
    closeModal();
    setAlertMessage("");
  };
  useEffect(() => {
    if (getErrors(errors) !== "" || getErrors(errorsSecond) !== "") {
      setAlertMessage(getErrors(errors) !== "" ? getErrors(errors) : getErrors(errorsSecond));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors.name?.message,
    errors.birthDay?.message,
    errors.gender?.message,
    errors.emailDomain?.message,
    errors.emailLocal?.message,
    errorsSecond.id?.message,
    errorsSecond.nickName?.message,
    errorsSecond.pwd?.message,
    errorsSecond.pwdCheck?.message,
  ]);

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
      {progress === 0 && (
        <RegisterProgress1
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          register={register}
          setIsAuth={setIsAuth}
          setAlertMessage={setAlertMessage}
        />
      )}
      {progress === 1 && (
        <RegisterProgress2
          handleSubmit={handleSubmitSecond}
          errors={errorsSecond}
          onSubmit={onSubmitSecond}
          register={registerSecond}
          getValues={getValues}
          setId={setId}
          setNickName={setNickName}
        />
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

export default Register;
