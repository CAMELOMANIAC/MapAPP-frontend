import { HTMLAttributes } from "react";
import styled from "styled-components";

type BackgroundListItemProps = HTMLAttributes<HTMLDivElement>;

const BackgroundListItem = ({ children, ...props }: BackgroundListItemProps) => {
  return <Container {...props}>{children}</Container>;
};

export default BackgroundListItem;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;
`;
