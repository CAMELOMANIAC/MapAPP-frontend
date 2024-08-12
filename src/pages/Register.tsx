import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
import RegisterProgress1 from "../components/RegisterProgress1";
import RegisterProgress2 from "../components/RegisterProgress2";

export type FormType = {
  name: string;
  birthDay: number;
  gender: string;
  emailLocal: string;
  emailDomain: string;
  authNumber: number;
};
export type FormTypeSecond = {
  id: string;
  pwd: string;
  pwdCheck: string;
};

const Register = () => {
  const [progress, setProgress] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  useEffect(() => {
    if (progress === 0) {
      setButtonName("다음");
      if (!isAuth) {
        setButtonClickHandler(() => {});
      } else {
        setButtonClickHandler(() => handleSubmit(onSubmit)());
        console.log("click");
      }
    } else if (progress === 1) {
      setButtonName("회원가입");
      setButtonClickHandler(() => {});
    }
  }, [progress, isAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onChange" });

  const {
    register: registerSecond,
    handleSubmit: handleSubmitSecond,
    formState: { errors: errorsSecond },
    getValues,
  } = useForm<FormTypeSecond>({ mode: "onChange" });

  //다음으로
  const onSubmit = (data: any) => {
    console.log(data);
    setProgress(1);
  };

  //회원가입
  const onSubmitSecond = (data: any) => {
    console.log(data);
  };

  return (
    <RegisterContainer>
      <H1>
        henmy 이용을 위해
        <br />
        회원가입을 진행해주세요
      </H1>
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
        />
      )}
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-bottom: auto;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;
