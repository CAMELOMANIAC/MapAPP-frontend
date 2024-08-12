import { Form, Input, Label } from "../assets/styles/CommonStyle";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormTypeSecond } from "../pages/Register";

type PropsType = {
  handleSubmit: UseFormHandleSubmit<FormTypeSecond, undefined>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<FormTypeSecond>;
  errors: FieldErrors<FormTypeSecond>;
  getValues: (value: string) => string;
};

const RegisterProgress2 = ({ handleSubmit, onSubmit, register, errors, getValues }: PropsType) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="id">
        아이디
        <Input
          {...register("id", {
            required: { value: true, message: "아이디를 입력해주세요" },
            pattern: {
              value: /^[a-zA-Z]{2,50}$/,
              message: "아이디는 2자 이상 50자 미만의 영어만 가능합니다.",
            },
          })}
          type="text"
          placeholder="아이디"
          id="id"
        />
        {errors.id && <span>{errors.id.message}</span>}
      </Label>
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
          placeholder="비밀번호"
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
          placeholder="비밀번호 확인"
          id="pwdCheck"
        />
        {errors.pwdCheck && <span>{errors.pwdCheck.message}</span>}
      </Label>
    </Form>
  );
};

export default RegisterProgress2;
