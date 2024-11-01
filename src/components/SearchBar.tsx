import { HTMLAttributes } from "react";
import styled from "styled-components";

type SearchBarProps = {} & HTMLAttributes<HTMLDivElement>;

const SearchBar = ({ ...props }: SearchBarProps) => {
  return <SearchBarInput type="text" placeholder="검색어를 입력하세요" {...props} />;
};

export default SearchBar;

const SearchBarInput = styled.input`
  background-color: white;
  display: flex;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  border: none;
  font-size: 16px;
  padding: 10px;
`;
