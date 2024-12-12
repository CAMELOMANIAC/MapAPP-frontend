import { useEffect } from "react";
import { useMap } from "react-map-gl";
import styled from "styled-components";

type TestMapButtonProps = {
  location: { latitude: number; longitude: number } | null;
};
const TestMapButton = ({ location }: TestMapButtonProps) => {
  const { current: map } = useMap(); //useMap은 Map 컴포넌트의 하위요소에서만 사용가능

  //현재 위치로 이동하는 버튼
  const onClickHandler = () => {
    if (location) {
      map?.flyTo({ center: [location.longitude, location.latitude] });
    }
  };

  //현재 위치가 변경되면 지도의 중심을 변경
  useEffect(() => {
    if (location) {
      map?.flyTo({ center: [location.longitude, location.latitude] });
    }
  }, [location, map]);

  return <TestButtons onClick={onClickHandler}>현재 위치로</TestButtons>;
};
export default TestMapButton;

const TestButtons = styled.button`
  position: relative;
  z-index: 1;
`;
