import { Outlet } from "react-router-dom"; //child route를 렌더링하는 컴포넌트
import styled from "styled-components";

import BottomNavigationBar from "../ui/BottomNavigationBar";

type BottomNavigationLayoutProps = {
  xMargin?: string;
  isNavHidden?: boolean;
};
const BottomNavigationLayout = ({ xMargin, isNavHidden }: BottomNavigationLayoutProps) => {
  return (
    <>
      <Container $xMargin={xMargin} $isNavHidden={isNavHidden}>
        <Outlet />
      </Container>
      {!isNavHidden && <BottomNavigationBar />}
    </>
  );
};

export default BottomNavigationLayout;

const Container = styled.div<{ $xMargin: string | undefined; $isNavHidden: boolean | undefined }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.$xMargin ? props.$xMargin : "20px")};
  padding-bottom: ${(props) => (props.$isNavHidden ? "0" : "60px")}; /* 하단 네비게이션 바를 위한 여백 */
  overflow-y: auto;
  background-color: #f8f8f8;
`;
