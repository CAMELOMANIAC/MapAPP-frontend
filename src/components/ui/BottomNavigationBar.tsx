import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const BottomNavigationBar = () => {
  const location = useLocation();

  return (
    <Container $path={location.pathname}>
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

const Container = styled.div<{ $path: string }>`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: ${(props) =>
    props.$path === "/location"
      ? "0px"
      : "1.5rem 1.5rem 0 0"}; /* location은 지도라서 글로벌 네비바가 분리되어보이지만 나머지는 그러지 않아서 추가 */

  box-shadow: 0 0 3px rgb(0 0 0 / 10%);
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
