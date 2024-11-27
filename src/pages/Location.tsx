import { useEffect, useState } from "react";
import { useUserDataStore } from "../utils/stores/userStore";
import Map, { MapMouseEvent, Marker, NavigationControl, useMap, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import useGetGeolocation from "../utils/hooks/useGetGeolocation";
import useGooglePlaceData from "../utils/hooks/useGooglePlaceData";
import MapMarker from "../components/ui/MapMarker";
import WriteButton from "../components/ui/WriteButton";
import MarkerDraggableButton from "../components/ui/MarkerDraggableButton";

const storage = window.localStorage;

const Location = () => {
  const { setLocation, location, mapCenter, setMapCenter } = useUserDataStore((state) => ({
    setLocation: state.setLocation,
    location: state.location,
    mapCenter: state.mapCenter,
    setMapCenter: state.setMapCenter,
  }));

  const [markerPos, setMarkerPos] = useState<{ latitude: number; longitude: number } | undefined>();
  const [isPress, setIsPress] = useState(false);

  //현재 보고있는 위치를 가져와서 렌더링 종료후에도 다시 사용할수있도록 저장
  const onMoveEndHandler = (event: ViewStateChangeEvent) => {
    const newCenter = {
      latitude: event.viewState.latitude,
      longitude: event.viewState.longitude,
      zoom: event.viewState.zoom,
    };
    if (newCenter.latitude !== mapCenter.latitude || newCenter.longitude !== mapCenter.longitude) {
      setMapCenter(newCenter);
    }
  };

  const onMouseMoveHandler = (e: MapMouseEvent) => {
    if (isPress) {
      const { lng, lat } = e.lngLat;
      setMarkerPos({ latitude: lat, longitude: lng });
    }
  };

  //현재위치를 맵에 적용
  const { location: currentLocation } = useGetGeolocation();
  useEffect(() => {
    if (currentLocation) setLocation(currentLocation);
  }, [currentLocation, setLocation]);

  //현재 위치가 변경되면 구글 플레이스 API를 이용하여 주변 명소 데이터를 가져옴(테스트를 위해 현재위치를 기반으로 하나 나중에 맵 중앙을 기반으로 변경해야함)
  const { data, isSuccess } = useGooglePlaceData(location.latitude, location.longitude);
  return (
    <>
      <Map
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: mapCenter?.latitude ?? 37.5326,
          longitude: mapCenter?.longitude ?? 127.024612,
          zoom: mapCenter?.zoom ?? 14,
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onMoveEnd={onMoveEndHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={() => {
          setIsPress(false);
        }}
      >
        {isSuccess &&
          data?.places?.map((item: any, index: number) => (
            <MapMarker
              latitude={item.location.latitude}
              longitude={item.location.longitude}
              displayName={item.displayName.text}
              key={item.displayName.text + index}
            />
          ))}
        {storage.getItem("photo") && ( //테스트용 마커(서버가 아니라 로컬스토리지에서 가져옴)
          <Marker
            latitude={JSON.parse(storage.getItem("photo")!).location.latitude}
            longitude={JSON.parse(storage.getItem("photo")!).location.longitude}
          >
            <DirectionArrow direction={JSON.parse(storage.getItem("photo")!).photoDirection}></DirectionArrow>
            <img src={JSON.parse(storage.getItem("photo")!).photo} width={12} height={12} alt="사진" />
          </Marker>
        )}
        <NavigationControl position="top-right" />
        <TestMapButton location={location} />
        <MarkerButtonContainer>
          <MarkerDraggableButton
            onMouseDown={() => {
              setIsPress(true);
            }}
          ></MarkerDraggableButton>
          <WriteButton to={"/location/write"} state={markerPos} isVisible={markerPos !== undefined}></WriteButton>
        </MarkerButtonContainer>
        {markerPos && <Marker latitude={markerPos.latitude} longitude={markerPos.longitude}></Marker>}
      </Map>
    </>
  );
};

export default Location;

const TestButtons = styled.button`
  position: relative;
  z-index: 1;
`;

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

const DirectionArrow = styled.div<{ direction: string }>`
  width: 4px;
  height: 100px;
  background-color: aqua;
  transform-origin: bottom center;
  rotate: ${(props) => props.direction}deg;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: "";
    border-color: aqua transparent transparent;
    border-style: solid;
    border-width: 10px 5px 0;
    transform: translateX(-50%);
  }
`;

const MarkerButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 2rem;
`;
