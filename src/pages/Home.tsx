import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import DivisionLineListContainer from "../components/ui/DivisionLineListContainer";
import SearchBar from "../components/ui/SearchBar";
import { useUserDataStore } from "../utils/stores/userStore";

const Home = () => {
  const navigate = useNavigate();
  const { userName } = useUserDataStore((state) => ({
    userName: state.userName,
  }));

  //로그인이 되어있지 않다면 로그인 페이지로 이동
  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [navigate, userName]);

  return (
    <>
      <StickyHeader>
        <SearchBar />
      </StickyHeader>
      <DivisionLineListContainer>
        <div>안녕하세요</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
        <div>asdfasd</div>
      </DivisionLineListContainer>
    </>
  );
};

export default Home;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
`;
