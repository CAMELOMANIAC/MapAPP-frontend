import { useEffect, useState } from "react";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
import RegisterProgress1 from "../components/RegisterProgress1";
import { useForm } from "react-hook-form";
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

const IdRecovery = () => {
  const [isAuth, setIsAuth] = useState(false);
  //레이아웃 커스텀훅
  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  useEffect(() => {
    setButtonName("아이디 찾기");
    setButtonClickHandler(() => {
      isAuth && handleSubmit(onSubmit)();
    });
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
    openModal();
  };

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  useEffect(() => {
    getErrors(errors) !== "" && openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors.name?.message,
    errors.birthDay?.message,
    errors.gender?.message,
    errors.emailDomain?.message,
    errors.emailLocal?.message,
  ]);

  return (
    <PageContainer>
      <PageTitleH1>
        Henmy 아이디를 찾기위해
        <br />
        본인인증을 진행해주세요
      </PageTitleH1>

      <RegisterProgress1
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        register={register}
        setIsAuth={setIsAuth}
      />
      {createPortal(
        <AlertModal isOpen={isOpen} closeModal={closeModal}>
          {getErrors(errors) !== "" ? (
            getErrors(errors)
          ) : (
            <div>
              회원님 아이디는
              <br />
              ***
              <br />
              입니다
            </div>
          )}
        </AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default IdRecovery;
