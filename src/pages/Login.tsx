import { Link } from "react-router-dom";
import styled from "styled-components";

import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import LoginProgress from "../components/container/LoginProgress";
import { useUserDataStore } from "../utils/stores/userStore";
const Login = () => {
  const { setUserName } = useUserDataStore((state) => ({
    setUserName: state.setUserName,
  }));
  const onClick = () => {
    setUserName("test");
  };

  return (
    <PageContainer>
      <PageTitleH1>로그인을 진행해주세요</PageTitleH1>
      <LoginProgress></LoginProgress>
      <EtcButtonContainer>
        <RecoveryContainer>
          <Link to={"/account_recovery/id"}>아이디</Link>/<Link to={"/account_recovery/pwd"}>비밀번호 찾기</Link>
        </RecoveryContainer>
        <Link to={"/register"}>회원가입</Link>
      </EtcButtonContainer>
      <Link to={"/"} onClick={onClick}>
        테스트이동
      </Link>
    </PageContainer>
  );
};

export default Login;

const EtcButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const RecoveryContainer = styled.span`
  margin: 0;

  a {
    margin: 0 5px;
  }
`;
