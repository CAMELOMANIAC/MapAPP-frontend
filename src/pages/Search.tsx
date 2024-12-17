import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../components/ui/SearchBar";

const Search = () => {
  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate(-1);
  };
  return (
    <StickyHeader>
      <BackButton onClick={backButtonHandler}>
        <IoIosArrowBack />
      </BackButton>
      <SearchBar></SearchBar>
    </StickyHeader>
  );
};

export default Search;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.5rem;
  font-size: 2rem;
`;
