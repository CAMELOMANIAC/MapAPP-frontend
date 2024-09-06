import { useEffect, useRef, useState } from "react";
import { NativeCompass } from "capacitor-native-compass";
import { isMobile } from "../utils/functions/commons";

const Mypage = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const ref = useRef<number>();

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setHeading(event.alpha);
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  useEffect(() => {
    isMobile() &&
      NativeCompass.getCurrentHeading().then((res) => {
        ref.current = res.value;
      });
  }, [heading]);

  const onClickHandler = () => {
    console.log("heading", ref.current);
  };

  return <button onClick={onClickHandler}>테스트 버튼</button>;
};

export default Mypage;
