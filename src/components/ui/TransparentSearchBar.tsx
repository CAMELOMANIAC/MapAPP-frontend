import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";

type TransparentSearchBarProps = {} & HTMLAttributes<HTMLInputElement>;

const TransparentSearchBar = forwardRef<HTMLInputElement, TransparentSearchBarProps>((props, ref) => {
  return <TransparentSearchBarInput type="text" placeholder="검색어를 입력하세요" {...props} ref={ref} />;
});

TransparentSearchBar.displayName = "TransparentSearchBar";
export default TransparentSearchBar;

const TransparentSearchBarInput = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: "transparent";
  border: none;
  outline: none;
`;
