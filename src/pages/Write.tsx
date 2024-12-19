import { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PageContainer } from "../assets/styles/CommonStyle";
import WriteForm from "../components/forms/WriteForm";

const Write = () => {
  const navigate = useNavigate();
  const pageBackButtonHandler = () => {
    navigate(-1);
  };

  //form의 submit 함수를 외부에서 호출하기 위해 ref를 사용
  const writeFormRef = useRef<{ onSubmit: () => void }>(null);
  const onSubmit = () => {
    if (writeFormRef.current) {
      writeFormRef.current.onSubmit();
    }
  };

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitleH1Ins>
          <button onClick={pageBackButtonHandler}>
            <IoIosArrowBack />
          </button>
          새 글을 작성할까요?
        </PageTitleH1Ins>
        <SubmitButton onClick={onSubmit}>작성하기</SubmitButton>
      </TitleContainer>
      <WriteForm ref={writeFormRef}></WriteForm>
    </PageContainer>
  );
};

export default Write;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const PageTitleH1Ins = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  font-weight: bold;
  color: white;
  background-color: var(--thema-color);
  border-radius: 18px;
`;
