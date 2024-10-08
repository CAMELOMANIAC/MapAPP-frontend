import { useForm } from "react-hook-form";
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Label, PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import { useEffect } from "react";
import { useUserDataStore } from "../utils/stores/userStore";
import { LayoutButtonProps } from "../components/BottomButtonLayout";

type FormType = {
  id: string;
  pwd: string;
};

const Login = () => {
  const { setUserName } = useUserDataStore((state) => ({
    setUserName: state.setUserName,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  const naviage = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
    naviage("/");
    setUserName(data.id);
  };

  //레이아웃 컨텍스트
  const { setButtonName, setButtonClickHandler } = useOutletContext<LayoutButtonProps>();

  useEffect(() => {
    setButtonName("로그인");
    setButtonClickHandler(() => handleSubmit(onSubmit));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageContainer>
        <PageTitleH1>로그인을 진행해주세요</PageTitleH1>
      </PageContainer>
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
            <RecoveryContainer>
              <Link to={"/account_recovery/id"}>아이디</Link>/<Link to={"/account_recovery/pwd"}>비밀번호 찾기</Link>
            </RecoveryContainer>
            <Link to={"/register"}>회원가입</Link>
          </EtcButtonContainer>
        </InputContainer>
        <Link to={"/write"}>테스트이동</Link>
      </Form>
    </>
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

const RecoveryContainer = styled.span`
  margin: 0;
  a {
    margin: 0 5px;
  }
`;
