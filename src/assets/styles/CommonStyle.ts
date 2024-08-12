import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 10px;
  margin-top: 10px;
`;

export const InputDivider = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
`;

export const Label = styled.label`
  width: 100%;
  height: 100%;
  margin: 1rem 0;
`;
