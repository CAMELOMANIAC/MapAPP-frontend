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
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  background-color: white;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: var(--thema-color);
  }

  & > p {
    font-size: 12px;
  }
`;
