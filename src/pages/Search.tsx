import { useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TransparentSearchBar from "../components/ui/TransparentSearchBar";

const Search = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);

  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <StickyHeader>
      <BackButton onClick={backButtonHandler}>
        <IoIosArrowBack />
      </BackButton>
      <TransparentSearchBar ref={searchBarRef}></TransparentSearchBar>
    </StickyHeader>
  );
};

export default Search;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.5rem;
  font-size: 2rem;
`;
