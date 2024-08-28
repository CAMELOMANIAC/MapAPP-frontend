import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BottomNavigationBar = () => {
  return (
    <Container>
      <StyledNavLink to="/">홈</StyledNavLink>
      <StyledNavLink to="/chat">채팅</StyledNavLink>
      <StyledNavLink to="/mypage">마이페이지</StyledNavLink>
      <StyledNavLink to="/setting">설정</StyledNavLink>
    </Container>
  );
};

export default BottomNavigationBar;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &.active {
    font-weight: bold;
    color: blue;
  }
`;
