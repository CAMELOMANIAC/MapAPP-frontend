import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type SearchBarProps = {} & HTMLAttributes<HTMLDivElement>;

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <SearchBarInput type="text" placeholder="검색어를 입력하세요" {...props} />
  );
};

export default SearchBar;

const SearchBarInput = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
`;
