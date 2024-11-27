import { RegisterOptions, useForm } from "react-hook-form";
import { Input, InputContainer, InputDivider, Label } from "../../assets/styles/CommonStyle";
import styled from "styled-components";

type DuplicateFormType = {
  onSubmit: (data: any) => void;
  inputId: string;
  inputType: string;
  labelName: string;
  buttonName: string;
  option?: RegisterOptions;
  placeHolder?: string;
};

const DuplicateForm = ({
  onSubmit,
  inputId,
  inputType,
  labelName,
  buttonName,
  option,
  placeHolder,
}: DuplicateFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, any>>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={inputId}>
        {labelName}
        <InputContainer>
          <InputDivider width={70}>
            <Input
              {...register(inputId, {
                ...option,
              })}
              type={inputType}
              id={inputId}
              placeholder={placeHolder}
            />
          </InputDivider>
          <InputDivider width={30}>
            <button type="submit">{buttonName}</button>
          </InputDivider>
        </InputContainer>
        {errors[inputId] && <span>{String(errors[inputId]?.message)}</span>}
      </Label>
    </Form>
  );
};

export default DuplicateForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 100%;
`;
