import styled from "styled-components";
import { useUserDataStore } from "../../utils/stores/userStore";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input, Label } from "../../assets/styles/CommonStyle";
import { LayoutButtonProps } from "../layouts/BottomButtonLayout";
import { useEffect } from "react";

type FormType = {
  id: string;
  pwd: string;
};
const LoginProgress = () => {
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/");
    setUserName(data.id);
  };

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();

  useEffect(() => {
    setButtonName("로그인");
    setButtonClickHandler(() => handleSubmit(onSubmit));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { setUserName } = useUserDataStore((state) => ({
    setUserName: state.setUserName,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Label htmlFor="id">
          아이디
          <Input
            {...register("id", {
              required: { value: true, message: "아이디를 입력해주세요" },
              pattern: {
                value: /[A-Za-z]+$/,
                message: "아이디 형식이 올바르지 않습니다",
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
      </InputContainer>
    </Form>
  );
};

export default LoginProgress;

const Form = styled.form`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
