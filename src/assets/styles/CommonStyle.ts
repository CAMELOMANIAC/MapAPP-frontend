import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100%;
  margin-bottom: 4rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid black;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 10px;
  margin-top: 10px;
`;

export const InputDivider = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
`;

export const Label = styled.label`
  width: 100%;
  margin: 1rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: auto;
`;

export const PageTitleH1 = styled.h1`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;
