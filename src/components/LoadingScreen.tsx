import styled, { keyframes } from "styled-components";

const LoadingScreen = ({ ...props }) => {
  return (
    <Container {...props}>
      <MarqueeContainer>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
        <WordItem text="붕어빵" scrollSpeed={10}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
        <WordItem text="오뎅" scrollSpeed={20}></WordItem>
      </MarqueeContainer>
      <MarqueeContainer>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
        <WordItem text="떡볶이" scrollSpeed={15}></WordItem>
      </MarqueeContainer>
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.div`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  z-index: 1000;
  background-color: white;
  transition: opacity 0.5s;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
  &.show {
    opacity: 1;
  }
`;
const MarqueeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  rotate: -30deg;
  transform-origin: 100% 0%;
`;

const WordItem = ({ text, scrollSpeed }: { text: string; scrollSpeed: number }) => {
  const textArray = text.split("");
  return (
    <Word $scrollSpeed={scrollSpeed}>
      {textArray.map((text, index) => (
        <TextStyle $highlight={index + 1 === textArray.length} key={index}>
          {text}
        </TextStyle>
      ))}
    </Word>
  );
};

const marquee = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const Word = styled.div<{ $scrollSpeed: number }>`
  position: relative;
  font-size: 7rem;
  font-weight: bold;
  animation: ${marquee} ${(props) => props.$scrollSpeed}s linear infinite;
`;

const TextStyle = styled.div<{ $highlight: boolean }>`
  color: ${(props) => (props.$highlight ? "gray" : "darkGray")};
`;
