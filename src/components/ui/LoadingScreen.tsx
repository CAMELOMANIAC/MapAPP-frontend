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
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  background-color: white;
  transition: opacity 0.5s;
  transform: translateX(-50%);

  &.hide {
    pointer-events: none;
    opacity: 0;
  }

  &.show {
    opacity: 1;
  }
`;
const MarqueeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: 100% 0%;
  rotate: -30deg;
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
