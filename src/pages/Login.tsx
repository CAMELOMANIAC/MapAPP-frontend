import styled from "styled-components";
import { PageContainer, PageTitleH1 } from "../assets/styles/CommonStyle";
import LoginProgress from "../components/LoginProgress";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <PageContainer>
        <PageTitleH1>로그인을 진행해주세요</PageTitleH1>
      </PageContainer>
      <LoginProgress></LoginProgress>
      <EtcButtonContainer>
        <RecoveryContainer>
          <Link to={"/account_recovery/id"}>아이디</Link>/<Link to={"/account_recovery/pwd"}>비밀번호 찾기</Link>
        </RecoveryContainer>
        <Link to={"/register"}>회원가입</Link>
      </EtcButtonContainer>
      <Link to={"/write"}>테스트이동</Link>
    </>
  );
};

export default Login;

const EtcButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const RecoveryContainer = styled.span`
  margin: 0;
  a {
    margin: 0 5px;
  }
`;
