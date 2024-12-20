import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import DuplicateForm from "./DuplicateForm";

type AuthNumberFormType = {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};
const AuthNumberForm = ({ setIsAuth, setAlertMessage }: AuthNumberFormType) => {
  const [resendText, setResendText] = useState("전송");

  const onAuthSubmit = (data: any) => {
    console.log(data);
    setIsAuth(true);
    setAlertMessage("본인인증이 완료되었습니다");
  };
  const onAuthresend = () => {
    console.log("resend");
    setResendText("재전송");
    setAlertMessage("인증번호가 재전송되었습니다");
  };

  return (
    <>
      <DuplicateForm
        buttonName="확인"
        inputId="authNumber"
        inputType="string"
        labelName="인증번호"
        onSubmit={onAuthSubmit}
        option={{
          required: { value: true, message: "인증번호를 입력해주세요" },
          pattern: {
            value: /^\d{8}$/,
            message: "숫자 8자리를 입력해주세요",
          },
        }}
      />
      <ReSendButton onClick={onAuthresend}>{resendText}</ReSendButton>
    </>
  );
};

export default AuthNumberForm;

const ReSendButton = styled.button`
  width: 100%;
  border: 1px solid #000;
`;
