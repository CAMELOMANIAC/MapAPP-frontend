import { useEffect, useState } from "react";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
import RegisterProgress1 from "../components/RegisterProgress1";
import { useForm } from "react-hook-form";
import ChangePwdProgress from "../components/ChangePwdProgress";
import useAlertModal from "../utils/hooks/useAlertModal";
import { createPortal } from "react-dom";
import AlertModal from "../components/AlertModal";
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

export type ChangePwdFormType = {
  pwd: string;
  pwdCheck: string;
};

const IdRecovery = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [progress, setProgress] = useState(0);
  //레이아웃 커스텀훅
  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  useEffect(() => {
    if (progress === 0) {
      setButtonName("본인인증 하기");
      setButtonClickHandler(() => {
        isAuth && handleSubmit(onSubmit)();
      });
    } else if (progress === 1) {
      setButtonName("비밀번호 재설정");
      setButtonClickHandler(() => {
        handleSubmit(changePwdonSubmit)();
      });
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
  useEffect(() => {
    (getErrors(errors) !== "" || getErrors(changePwderrors)) && openModal();
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

          <RegisterProgress1
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            register={register}
            setIsAuth={setIsAuth}
          />
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
        <AlertModal isOpen={isOpen} closeModal={closeModal}>
          {getErrors(errors) !== "" ? (
            getErrors(errors)
          ) : (
            <div>
              비밀번호 설정이 완료되었어요
              <br />
              다시 로그인 해주세요
            </div>
          )}
        </AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default IdRecovery;
