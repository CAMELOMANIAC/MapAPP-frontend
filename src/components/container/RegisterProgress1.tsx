import { useEffect, useRef, useState } from "react";
import { Form, Input, InputContainer, InputDivider, Label } from "../../assets/styles/CommonStyle";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { LayoutButtonProps } from "../layouts/BottomButtonLayout";
import AuthNumberForm from "../forms/AuthNumberForm";

type RegisterProgress1Type = {
  setProgress?: React.Dispatch<React.SetStateAction<number>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};
type FormType = {
  name: string;
  birthDay: number;
  gender: number;
  emailLocal: string;
  emailDomain: string;
  authNumber: number;
  [key: string]: string | number;
};

const RegisterProgress1 = ({ setProgress, setAlertMessage }: RegisterProgress1Type) => {
  const [isAuth, setIsAuth] = useState(false);
  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();

  useEffect(() => {
    setButtonName("다음");
    setButtonClickHandler(() => handleSubmit(onSubmit));
    return () => {
      setButtonName("");
      setButtonClickHandler(() => {});
    };
  }, [isAuth, setButtonName, setButtonClickHandler]); //eslint-disable-line

  //다음으로
  const onSubmit = (data: FormType) => {
    console.log(data);
    if (isAuth && setProgress) setProgress(1);
    else {
      setAlertMessage("본인인증을 진행해주세요");
    }
  };

  //RegisterProgress1을 위한 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  const [isAuthPortalVisible, setIsAuthPortalVisible] = useState(false);
  const authContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authContainerRef.current) setIsAuthPortalVisible(true);
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">
          이름
          <Input
            {...register("name", {
              required: { value: true, message: "이름을 입력해주세요" },
              pattern: {
                value: /^[a-zA-Z가-힣\s'-]{2,50}$/,
                message: "이름은 영문또는 한글로 2~50자 이내로 입력해주세요",
              },
            })}
            type="text"
            placeholder="이름을 입력해주세요"
            id="name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </Label>
        <Label htmlFor="birthDay">
          생년월일
          <InputContainer>
            <InputDivider width={45}>
              <Input
                {...register("birthDay", {
                  required: { value: true, message: "주민번호 앞 6자리를 입력해주세요" },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "생년월일 6자리를 입력해주세요",
                  },
                })}
                type="number"
                placeholder="6자리"
                id="birthDay"
              />
            </InputDivider>
            <InputDivider width={10}>-</InputDivider>
            <InputDivider width={15}>
              <Input
                {...register("gender", {
                  required: { value: true, message: "주민번호 첫째자리를 입력해주세요" },
                  minLength: {
                    value: 1,
                    message: "주민번호 첫째 자리 숫자를 입력해주세요",
                  },
                })}
                type="number"
                placeholder="*"
                id="gender"
              />
            </InputDivider>
            <InputDivider width={30}>*****</InputDivider>
          </InputContainer>
          {(errors.birthDay || errors.gender) && (
            <span>{errors.gender ? errors.gender.message : errors.birthDay && errors.birthDay.message}</span>
          )}
        </Label>
        <Label htmlFor="emailLocal">
          이메일 주소
          <InputContainer>
            <InputDivider width={45}>
              <Input
                {...register("emailLocal", {
                  required: { value: true, message: "이메일 계정이름을 입력해주세요" },
                  pattern: {
                    value: /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/,
                    message: "유효한 이메일 계정이름을 입력해주세요",
                  },
                })}
                type="string"
                id="emailLocal"
              />
            </InputDivider>
            <InputDivider width={10}>@</InputDivider>
            <InputDivider width={45}>
              <select
                {...register("emailDomain", {
                  required: { value: true, message: "이메일 제공자를 선택해주세요" },
                  pattern: {
                    value: /.+/,
                    message: "이메일 제공자를 선택해주세요",
                  },
                })}
                id="emailDomain"
              >
                <option value="">이메일 선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </InputDivider>
          </InputContainer>
          {(errors.emailLocal || errors.emailDomain) && (
            <span>
              {errors.emailDomain ? errors.emailDomain.message : errors.emailLocal && errors.emailLocal.message}
            </span>
          )}
        </Label>
        <AuthContainer ref={authContainerRef}></AuthContainer>
      </Form>

      {isAuthPortalVisible &&
        authContainerRef.current &&
        createPortal(
          <AuthNumberForm setAlertMessage={setAlertMessage} setIsAuth={setIsAuth} />,
          authContainerRef.current
        )}
    </>
  );
};

export default RegisterProgress1;

const AuthContainer = styled.div`
  width: 100%;
  height: min-content;
`;
