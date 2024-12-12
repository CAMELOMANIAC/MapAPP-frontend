import { Outlet } from "react-router-dom"; //child route를 렌더링하는 컴포넌트
import styled from "styled-components";

import BottomNavigationBar from "../ui/BottomNavigationBar";

type BottomNavigationLayoutProps = {
  xMargin?: string;
};
const BottomNavigationLayout = ({ xMargin }: BottomNavigationLayoutProps) => {
  return (
    <>
      <Container $xMargin={xMargin}>
        <Outlet />
      </Container>
      <BottomNavigationBar />
    </>
  );
};

export default BottomNavigationLayout;

const Container = styled.div<{ $xMargin: string | undefined }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.$xMargin ? props.$xMargin : "20px")};
  padding-bottom: 60px; /* 하단 네비게이션 바를 위한 여백 */
  background-color: #f8f8f8;
`;
