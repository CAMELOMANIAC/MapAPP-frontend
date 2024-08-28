import { Outlet } from "react-router-dom"; //child route를 렌더링하는 컴포넌트
import BottomNavigationBar from "./BottomNavigationBar";
import styled from "styled-components";

const BottomNavigationLayout = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
      <BottomNavigationBar />
    </>
  );
};

export default BottomNavigationLayout;

const Container = styled.div`
  padding-bottom: 60px; //하단 네비게이션 바를 위한 여백
  background-color: black;
  width: 100%;
  height: 100%;
`;
