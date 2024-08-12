import { Outlet } from "react-router-dom"; //child route를 렌더링하는 컴포넌트
import BottomNavigationBar from "./BottomNavigationBar";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 60px; //하단 네비게이션 바를 위한 여백
`;

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
