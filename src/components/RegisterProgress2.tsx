import { Form, Input, InputContainer, InputDivider, Label } from "../assets/styles/CommonStyle";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormTypeSecond } from "../pages/Register";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type PropsType = {
  handleSubmit: UseFormHandleSubmit<FormTypeSecond, undefined>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<FormTypeSecond>;
  errors: FieldErrors<FormTypeSecond>;
  getValues: (value: string) => string;
  setId: (id: string) => void;
  setNickName: (nickName: string) => void;
};

const RegisterProgress2 = ({ handleSubmit, onSubmit, register, errors, getValues, setId, setNickName }: PropsType) => {
  const idContainerRef = useRef<HTMLDivElement>(null);
  const nickNameContainerRef = useRef<HTMLDivElement>(null);
  const [idPortalVisible, setIdPortalVisible] = useState(false);
  const [nickNamePortalVisible, setNickNamePortalVisible] = useState(false);

  useEffect(() => {
    if (idContainerRef.current) setIdPortalVisible(true);
    if (nickNameContainerRef.current) setNickNamePortalVisible(true);
  }, []);

  const {
    register: registerId,
    handleSubmit: handleSubmitId,
    formState: { errors: errorsId },
  } = useForm<FormTypeSecond>({ mode: "onSubmit" });

  const {
    register: registerNickName,
    handleSubmit: handleSubmitNickName,
    formState: { errors: errorsNickName },
  } = useForm<FormTypeSecond>({ mode: "onSubmit" });

  const onIdSubmit = (data: any) => {
    console.log(data.id);
    setId(String(data.id));
  };
  const onNickNameSubmit = (data: any) => {
    console.log(data.nickName);
    setNickName(String(data.nickName));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer ref={idContainerRef}></FormContainer>
        <FormContainer ref={nickNameContainerRef}></FormContainer>
        <Label htmlFor="pwd">
          비밀번호
          <Input
            {...register("pwd", {
              required: { value: true, message: "비밀번호를 입력해주세요" },
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
            type="password"
            placeholder="사용할 비밀번호를 입력해주세요"
            id="pwd"
          />
          {errors.pwd && <span>{errors.pwd.message}</span>}
        </Label>
        <Label htmlFor="pwdCheck">
          비밀번호 확인
          <Input
            {...register("pwdCheck", {
              required: { value: true, message: "비밀번호 확인를 입력해주세요" },
              validate: (value) => value === getValues("pwd") || "비밀번호가 일치하지 않습니다",
            })}
            type="password"
            placeholder="다시 입력해주세요"
            id="pwdCheck"
          />
          {errors.pwdCheck && <span>{errors.pwdCheck.message}</span>}
        </Label>
      </Form>

      {idPortalVisible &&
        idContainerRef.current &&
        createPortal(
          <Form onSubmit={handleSubmitId(onIdSubmit)}>
            <Label htmlFor="id">
              아이디
              <InputContainer>
                <InputDivider width={70}>
                  <Input
                    {...registerId("id", {
                      required: { value: true, message: "아이디를 입력해주세요" },
                      pattern: {
                        value: /^[a-zA-Z0-9][a-zA-Z0-9._-]{2,50}$/,
                        message: "아이디는 2자에서 50자 사이 영문, 숫자만 가능합니다.",
                      },
                    })}
                    type="text"
                    placeholder="사용할 아이디를 입력해주세요"
                    id="id"
                  />
                </InputDivider>
                <InputDivider width={30}>
                  <button type="submit">중복확인</button>
                </InputDivider>
              </InputContainer>
              {errorsId.id && <span>{errorsId.id.message}</span>}
            </Label>
          </Form>,
          idContainerRef.current
        )}
      {nickNamePortalVisible &&
        nickNameContainerRef.current &&
        createPortal(
          <Form onSubmit={handleSubmitNickName(onNickNameSubmit)}>
            <Label htmlFor="nickName">
              닉네임
              <InputContainer>
                <InputDivider width={70}>
                  <Input
                    {...registerNickName("nickName", {
                      required: { value: true, message: "닉네임을 입력해주세요" },
                      pattern: {
                        value: /^[a-zA-Z0-9_-]{2,50}$/,
                        message:
                          "닉네임은 2자에서 50자 사이의 알파벳, 숫자, 밑줄(_) 및 하이픈(-)만 사용할 수 있습니다.",
                      },
                    })}
                    type="text"
                    placeholder="상대방에게 보여지는 이름이에요"
                    id="nickName"
                  />
                </InputDivider>
                <InputDivider width={30}>
                  <button type="submit">중복확인</button>
                </InputDivider>
              </InputContainer>
              {errorsNickName.nickName && <span>{errorsNickName.nickName.message}</span>}
            </Label>
          </Form>,
          nickNameContainerRef.current
        )}
    </>
  );
};

export default RegisterProgress2;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
`;
