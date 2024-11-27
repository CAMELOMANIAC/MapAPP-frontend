import { Form, Input, Label } from "../../assets/styles/CommonStyle";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutButtonProps } from "../layouts/BottomButtonLayout";
import DuplicateForm from "../forms/DuplicateForm";

type RegisterProgress2Type = {
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

type FormType = {
  id: string;
  nickName: string;
  pwd: string;
  pwdCheck: string;
  [key: string]: string;
};

const RegisterProgress2 = ({ setAlertMessage }: RegisterProgress2Type) => {
  const idContainerRef = useRef<HTMLDivElement>(null);
  const nickNameContainerRef = useRef<HTMLDivElement>(null);
  const [idPortalVisible, setIdPortalVisible] = useState(false);
  const [nickNamePortalVisible, setNickNamePortalVisible] = useState(false);
  const navigate = useNavigate();
  const [isDuplicateId, setIsDuplicateId] = useState(false);
  const [isDuplicateNickName, setIsDuplicateNickName] = useState(false);

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();

  //회원가입
  const onSubmit = (data: FormType) => {
    console.log("실행은되나요?", data);
    if (isDuplicateId && isDuplicateNickName) {
      navigate("/login");
    } else {
      setAlertMessage("아이디와 닉네임 중복확인을 진행해주세요");
    }
  };

  useEffect(() => {
    setButtonName("회원가입");
    setButtonClickHandler(() => handleSubmit(onSubmit));
    return () => {
      setButtonName("");
      setButtonClickHandler(() => {});
    };
  }, [setButtonName, setButtonClickHandler]); //eslint-disable-line

  //RegisterProgress2을 위한 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormType>({ mode: "onSubmit" });

  useEffect(() => {
    if (idContainerRef.current) setIdPortalVisible(true);
    if (nickNameContainerRef.current) setNickNamePortalVisible(true);
  }, []);

  const onIdSubmit = (data: any) => {
    console.log(data.id);
    setIsDuplicateId(true);
  };
  const onNickNameSubmit = (data: any) => {
    console.log(data.nickName);
    setIsDuplicateNickName(true);
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
          <DuplicateForm
            buttonName="중복확인"
            inputId="id"
            inputType="string"
            labelName="아이디"
            onSubmit={onIdSubmit}
            option={{
              required: { value: true, message: "아이디를 입력해주세요" },
              pattern: {
                value: /^[a-zA-Z0-9][a-zA-Z0-9._-]{2,50}$/,
                message: "아이디는 2자에서 50자 사이 영문, 숫자만 가능합니다.",
              },
            }}
            placeHolder="로그인에 사용할 아이디를 입력해주세요"
          ></DuplicateForm>,
          idContainerRef.current
        )}
      {nickNamePortalVisible &&
        nickNameContainerRef.current &&
        createPortal(
          <DuplicateForm
            buttonName="중복확인"
            inputId="nickName"
            inputType="string"
            labelName="닉네임"
            onSubmit={onNickNameSubmit}
            option={{
              required: { value: true, message: "닉네임을 입력해주세요" },
              pattern: {
                value: /^[a-zA-Z0-9_-]{2,50}$/,
                message: "닉네임은 2자에서 50자 사이의 알파벳, 숫자, 밑줄(_) 및 하이픈(-)만 사용할 수 있습니다.",
              },
            }}
            placeHolder="상대방에게 보여지는 이름이에요"
          ></DuplicateForm>,
          nickNameContainerRef.current
        )}
    </>
  );
};

export default RegisterProgress2;

const FormContainer = styled.div`
  width: 100%;
`;
