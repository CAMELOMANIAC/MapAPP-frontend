import { useForm } from "react-hook-form";
import styled from "styled-components";

import { Form, Label, Textarea } from "../../assets/styles/CommonStyle";
type FormType = {
  content: string;
};

type SubmitType = {
  content: string;
};

type ContentFormType = {
  onSubmit: (data: SubmitType) => void;
};

const ContentForm = ({ onSubmit }: ContentFormType) => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Label htmlFor="content">내용</Label>
        <Textarea
          {...register("content", {
            required: { value: true, message: "내용을 입력해주세요" },
          })}
          placeholder="내용을 입력해주세요"
          id="content"
        ></Textarea>
      </InputContainer>
    </Form>
  );
};

export default ContentForm;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
