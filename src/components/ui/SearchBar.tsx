import { HTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type SearchBarProps = {} & HTMLAttributes<HTMLDivElement>;

const SearchBar = ({ ...props }: SearchBarProps) => {
  const navigate = useNavigate();
  const searchBarClickHandler = () => {
    navigate("/search");
  };
  return (
    <SearchContainer onClick={searchBarClickHandler}>
      <SearchIcon />
      <SearchBarInput type="text" placeholder="검색어를 입력하세요" {...props} />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
`;

const SearchBarInput = styled.input`
  display: flex;
  width: 100%;
  padding-left: 0.5rem;
  font-size: 16px;
  border: none;
  outline: none;
`;

const SearchIcon = styled(FaSearch)`
  margin: 0 0.4rem;
  color: #6e6e6e;
`;
