import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type ListContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const ListContainer = ({ children, ...props }: ListContainerProps) => {
  return <Container {...props}>{children}</Container>;
};

export default ListContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  > div {
    width: 100%;
    display: flex;
    justify-content: left;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1rem;
    padding-left: 10px;
    padding-right: 10px;
    &:last-child {
      border-bottom: none;
    }
  }
`;
