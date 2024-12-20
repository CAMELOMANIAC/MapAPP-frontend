import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type DivisionLineListContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const DivisionLineListContainer = ({ children, ...props }: DivisionLineListContainerProps) => {
  return <Container {...props}>{children}</Container>;
};

export default DivisionLineListContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  margin-top: 1rem;

  > div {
    display: flex;
    justify-content: left;
    width: 100%;
    padding-right: 10px;
    padding-bottom: 1rem;
    padding-left: 10px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  }
`;
