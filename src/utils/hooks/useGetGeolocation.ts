import { useEffect, useRef, useState } from "react";
import { LocationType } from "../stores/userStore";

/**
 * 현재 GPS위치를 가져오는 커스텀 훅(웹 api)
 *
 * @returns {Object} location - 현재 위치 정보
 * @returns {Function} refreshLocation - 후크를 다시 실행하는 함수
 */
const useGetGeolocation = () => {
  const locationRef = useRef<LocationType | null>(null);
  const [trigger, setTrigger] = useState(false);

  //웹 gps를 이용하여 현재 위치를 가져옴
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          locationRef.current = { latitude, longitude, zoom: 14 };
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [trigger]); // 트리거 상태를 의존성 배열에 추가

  // 트리거 상태를 변경하는 함수 반환
  const refreshLocation = () => setTrigger((prev) => !prev);

  return { location: locationRef.current, refreshLocation };
};

export default useGetGeolocation;
