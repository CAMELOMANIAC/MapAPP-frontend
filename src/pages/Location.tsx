import { useEffect } from "react";
import { useUserDataStore } from "../utils/stores/userStore";
import Map, { Marker, NavigationControl, useMap, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import { getGooglePlaceData } from "../utils/functions/api";
import { useQuery } from "@tanstack/react-query";
import { IoMdCamera } from "react-icons/io";

const Location = () => {
  const { setLocation, location, mapCenter, setMapCenter } = useUserDataStore((state) => ({
    setLocation: state.setLocation,
    location: state.location,
    mapCenter: state.mapCenter,
    setMapCenter: state.setMapCenter,
  }));

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

  //웹 gps를 이용하여 현재 위치를 가져옴
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude, zoom: 14 });
          },
          (error) => {
            console.error("Error Code = " + error.code + " - " + error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, [setLocation]);

  //현재 위치가 변경되면 구글 플레이스 API를 이용하여 주변 명소 데이터를 가져옴(테스트를 위해 현재위치를 기반으로 하나 나중에 맵 중앙을 기반으로 변경해야함)
  const { data, isSuccess } = useQuery({
    queryKey: ["googlePlaceData", location.latitude, location.longitude],
    queryFn: () => getGooglePlaceData(location.latitude, location.longitude),
    staleTime: 1000 * 60,
  });

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
      >
        {isSuccess &&
          data &&
          data.places.map((item: any) => (
            <Marker latitude={item.location.latitude} longitude={item.location.longitude} key={item.displayName.text}>
              <IoMdCamera />
              {item.displayName.text}
            </Marker>
          ))}
        <NavigationControl position="top-right" />
        <TestMapButton location={location} />
      </Map>
    </>
  );
};

export default Location;

const TestButtons = styled.button`
  position: absolute;
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
