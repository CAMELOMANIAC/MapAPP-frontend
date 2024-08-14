import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Label } from "../assets/styles/CommonStyle";
import { useBottomButtonLayoutStore } from "../components/BottomButtonLayout";
import { useEffect } from "react";

type FormType = {
  id: string;
  pwd: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onChange" });

  const naviage = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
    naviage("/home");
  };

  const { setButtonName, setButtonClickHandler } = useBottomButtonLayoutStore((state) => ({
    setButtonName: state.setButtonName,
    setButtonClickHandler: state.setButtonClickHandler,
  }));

  useEffect(() => {
    setButtonName("로그인");
    setButtonClickHandler(() => handleSubmit(onSubmit)());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <EtcButtonContainer>
          <Link to={"/account_recovery"}>아이디/비밀번호 찾기</Link>
          <Link to={"/register"}>회원가입</Link>
        </EtcButtonContainer>
      </InputContainer>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const EtcButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
