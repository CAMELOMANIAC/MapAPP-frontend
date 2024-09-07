import { Outlet, useLocation } from "react-router-dom"; //child route를 렌더링하는 컴포넌트
import BottomNavigationBar from "./BottomNavigationBar";
import styled from "styled-components";

const BottomNavigationLayout = () => {
  const location = useLocation();

  return (
    <>
      <Container $location={location.pathname}>
        <Outlet />
      </Container>
      <BottomNavigationBar />
    </>
  );
};

export default BottomNavigationLayout;

const Container = styled.div<{ $location: string }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.$location === "/location" ? "0" : "20px")};
  padding-bottom: 60px; //하단 네비게이션 바를 위한 여백
`;
