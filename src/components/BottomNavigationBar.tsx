import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BottomNavigationBar = () => {
  return <Container></Container>;
};

export default BottomNavigationBar;
