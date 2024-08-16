import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
import RegisterProgress1 from "../components/RegisterProgress1";
import RegisterProgress2 from "../components/RegisterProgress2";
import AlertModal from "../components/AlertModal";
import { createPortal } from "react-dom";
import useAlertModal from "../utils/hooks/useAlertModal";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { getErrors } from "../utils/functions/commons";

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

  //레이아웃 커스텀훅
  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  //다음으로
  const onSubmit = (data: FormType) => {
    console.log(data);
    setProgress(1);
  };

  //회원가입
  const onSubmitSecond = (data: FormTypeSecond) => {
    console.log(data);
  };

  useEffect(() => {
    if (progress === 0) {
      setButtonName("다음");
      if (!isAuth) {
        setButtonClickHandler(() => {});
      } else {
        setButtonClickHandler(() => {
          handleSubmit(onSubmit)();
        });
      }
    } else if (progress === 1) {
      setButtonName("회원가입");
      setButtonClickHandler(() => {});
    }
  }, [progress, isAuth, setButtonName, setButtonClickHandler]); //eslint-disable-line

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
  useEffect(() => {
    (getErrors(errors) !== "" || getErrors(errorsSecond) !== "") && openModal();
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
        <AlertModal
          isOpen={isOpen}
          closeModal={closeModal}
        >{`${getErrors(errors) !== "" ? getErrors(errors) : getErrors(errorsSecond)}`}</AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default Register;
