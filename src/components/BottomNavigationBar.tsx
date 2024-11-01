import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GoHomeFill } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const BottomNavigationBar = () => {
  return (
    <Container>
      <StyledNavLink to="/">
        <GoHomeFill />
        <p>홈</p>
      </StyledNavLink>
      <StyledNavLink to="/location">
        <FaLocationDot />
        <p>위치</p>
      </StyledNavLink>
      <StyledNavLink to="/search">
        <FaSearch />
        <p>검색</p>
      </StyledNavLink>
      <StyledNavLink to="/mypage">
        <FaUser />
        <p>마이페이지</p>
      </StyledNavLink>
    </Container>
  );
};

export default BottomNavigationBar;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &.active {
    font-weight: bold;
    color: blue;
  }
  & > p {
    font-size: 12px;
  }
`;
