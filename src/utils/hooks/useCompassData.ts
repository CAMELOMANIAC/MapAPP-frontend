import { useEffect, useRef, useState } from "react";

import { isMobile, isWebView } from "../functions/commons";

/**
 * 진북기준 현재 디바이스의 방위각을 반환하는 훅
 *
 * @returns {number | null} 방위각 degree
 * @description capacitor-native-compass를 동적으로 임포트하여 사용합니다.
 *  웹에서는 사용할 수 없으며 capacitor v5버전 플러그인을 사용중이므로 주의해야합니다.
 */
const useCompassData = () => {
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
    if (isMobile() && isWebView()) {
      import("capacitor-native-compass")
        .then((module) => {
          const { NativeCompass } = module; //NativeCompass는 웹에서 임포트시 오류가 발생하므로 동적임포트
          NativeCompass.getCurrentHeading().then((res) => {
            ref.current = res.value;
          });
        })
        .catch((err) => {
          console.error("Failed to load NativeCompass:", err);
        });
    }
  }, [heading]);

  return ref.current;
};

export default useCompassData;
