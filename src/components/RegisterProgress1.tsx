import { useEffect, useRef, useState } from "react";
import { Form, Input, InputDivider, Label } from "../assets/styles/CommonStyle";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { FormType } from "../pages/Register";

type AuthFormType = {
  authNumber: number;
};
type PropsType = {
  handleSubmit: UseFormHandleSubmit<FormType, undefined>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  setIsAuth: (isAuth: boolean) => void;
};

const RegisterProgress1 = ({ handleSubmit, onSubmit, register, errors, setIsAuth }: PropsType) => {
  const [isAuthPortalVisible, setIsAuthPortalVisible] = useState(false);
  const authContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authContainerRef.current) setIsAuthPortalVisible(true);
  }, []);

  const {
    register: authRegister,
    handleSubmit: authHandleSubmit,
    formState: { errors: authErrors },
  } = useForm<AuthFormType>();

  const onAuthSubmit = (data: any) => {
    console.log(data);
    setIsAuth(true);
  };
  const onAuthresend = () => {
    console.log("resend");
  };

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
                message: "이름은 한글자 이상 50자 미만의 영어, 한국어만 허용합니다.",
              },
            })}
            type="text"
            placeholder="이름"
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
                placeholder="******"
                id="birthDay"
              />
            </InputDivider>
            <InputDivider width={10}>-</InputDivider>
            <InputDivider width={10}>
              <Input
                {...register("gender", {
                  required: { value: true, message: "주민번호 첫째자리를 입력해주세요" },
                  pattern: {
                    value: /^\d{1}$/,
                    message: "알맞은 주민번호 형식이 아닙니다.",
                  },
                })}
                type="number"
                placeholder="*"
                id="gender"
              />
            </InputDivider>
            <InputDivider width={35}>*****</InputDivider>
          </InputContainer>
          {(errors.birthDay || errors.gender) && (
            <span>{errors.gender ? errors.gender.message : errors.birthDay && errors.birthDay.message}</span>
          )}
        </Label>

        <Label htmlFor="emailLocal">
          이메일
          <InputContainer>
            <InputDivider width={45}>
              <Input
                {...register("emailLocal", {
                  required: { value: true, message: "이메일 계정이름을 입력해주세요" },
                  pattern: {
                    value: /.+/,
                    message: "생년월일 6자리를 입력해주세요",
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
          <Form onSubmit={authHandleSubmit(onAuthSubmit)}>
            <Label htmlFor="authNumber">
              인증번호
              <InputContainer>
                <InputDivider width={70}>
                  <Input
                    {...authRegister("authNumber", {
                      required: { value: true, message: "인증번호를 입력해주세요" },
                      pattern: {
                        value: /^\d{8}$/,
                        message: "숫자 8자리를 입력해주세요",
                      },
                    })}
                    type="string"
                    id="authNumber"
                  />
                </InputDivider>
                <InputDivider width={30}>
                  <button type="submit">확인</button>
                </InputDivider>
              </InputContainer>
              {authErrors.authNumber && <span>{authErrors.authNumber.message}</span>}
            </Label>
            <ReSendButton onClick={onAuthresend}>재전송</ReSendButton>
          </Form>,
          authContainerRef.current
        )}
    </>
  );
};

export default RegisterProgress1;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ReSendButton = styled.button`
  width: 100%;
  height: rem;
  border: 1px solid #000;
  margin-bottom: 1rem;
`;
