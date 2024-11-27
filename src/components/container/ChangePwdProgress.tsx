import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Form, Input, Label } from "../../assets/styles/CommonStyle";
import { ChangePwdFormType } from "../../pages/PwdRecovery";

type PropsType = {
  handleSubmit: UseFormHandleSubmit<ChangePwdFormType, undefined>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<ChangePwdFormType>;
  errors: FieldErrors<ChangePwdFormType>;
  getValues: (value: string) => string;
};

const ChangePwdProgress = ({ handleSubmit, onSubmit, register, errors, getValues }: PropsType) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default ChangePwdProgress;
