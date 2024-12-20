import "mapbox-gl/dist/mapbox-gl.css";

import { TouchEvent, useEffect, useRef, useState } from "react";
import { Map, MapMouseEvent, MapRef, MapTouchEvent, Marker, ViewStateChangeEvent } from "react-map-gl";
import { styled } from "styled-components";

import useGetGeolocation from "../../utils/hooks/useGetGeolocation";
import useGooglePlaceData from "../../utils/hooks/useGooglePlaceData";
import { useUserDataStore } from "../../utils/stores/userStore";
import MapMarker from "../ui/MapMarker";
import MarkerDraggableButton from "../ui/MarkerDraggableButton";
import SearchBar from "../ui/SearchBar";
import TestMapButton from "../ui/TestMapButton";
import WriteButton from "../ui/WriteButton";

type Place = {
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
  };
};

const MapContainer = () => {
  const [markerPos, setMarkerPos] = useState<{ latitude: number; longitude: number } | undefined>();
  const [isPress, setIsPress] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const { setLocation, location, mapCenter, setMapCenter } = useUserDataStore((state) => ({
    setLocation: state.setLocation,
    location: state.location,
    mapCenter: state.mapCenter,
    setMapCenter: state.setMapCenter,
  }));

  //현재 위치가 변경되면 구글 플레이스 API를 이용하여 주변 명소 데이터를 가져옴(테스트를 위해 현재위치를 기반으로 하나 나중에 맵 중앙을 기반으로 변경해야함)
  const { data, isSuccess } = useGooglePlaceData(location.latitude, location.longitude);

  //현재위치를 맵에 적용
  const { location: currentLocation } = useGetGeolocation();
  useEffect(() => {
    if (currentLocation) setLocation(currentLocation);
  }, [currentLocation, setLocation]);

  //현재 보고있는 위치를 가져와서 렌더링 종료후에도 다시 사용할수있도록 저장
  const mapCenterChangeHandler = <T extends ViewStateChangeEvent | MapTouchEvent>(event: T) => {
    let newCenter;
    if ("viewState" in event) {
      newCenter = {
        latitude: event.viewState.latitude,
        longitude: event.viewState.longitude,
        zoom: event.viewState.zoom,
      };
    } else {
      if (mapRef.current) {
        const center = mapRef.current.getMap().getCenter();
        newCenter = {
          latitude: center.lat,
          longitude: center.lng,
          zoom: mapRef.current.getMap().getZoom(),
        };
      }
    }
    if (newCenter && (newCenter.latitude !== mapCenter.latitude || newCenter.longitude !== mapCenter.longitude)) {
      setMapCenter(newCenter);
    }
  };

  const markerPositionChangeHandler = (e: MapMouseEvent | MapTouchEvent) => {
    if (isPress) {
      const { lng, lat } = e.lngLat;
      setMarkerPos({ latitude: lat, longitude: lng });
    }
  };

  //터치 이벤트는 자기 외부에서 실행되면 추적이 안되서 터치위치를 추적해서 직접 변경
  const markerPositionChangeTouchHandler = (event: TouchEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = event.touches[0];
    if (mapRef.current) {
      const point = mapRef.current.unproject([clientX, clientY]);
      setMarkerPos({ latitude: point.lat, longitude: point.lng });
    }
  };

  const storage = window.localStorage;

  return (
    <Map
      reuseMaps
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        latitude: mapCenter?.latitude ?? 37.5326,
        longitude: mapCenter?.longitude ?? 127.024612,
        zoom: mapCenter?.zoom ?? 14,
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      ref={mapRef}
      onMoveEnd={mapCenterChangeHandler}
      onMouseMove={markerPositionChangeHandler}
      onMouseUp={() => {
        setIsPress(false);
      }}
      onTouchMove={(e) => {
        markerPositionChangeHandler(e);
      }}
      onTouchCancel={() => {
        setIsPress(false);
      }}
    >
      {isSuccess &&
        data?.places?.map((item: Place, index: number) => (
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
      <SearchBarContainer>
        <SearchBar></SearchBar>
        {/* <NavigationControl position="top-right" /> */}
        <TestMapButton location={location} />
      </SearchBarContainer>
      <MarkerButtonContainer>
        <MarkerDraggableButton
          onMouseDown={() => {
            setIsPress(true);
          }}
          onTouchStart={() => {
            setIsPress(true);
          }}
          onTouchMove={markerPositionChangeTouchHandler}
          onTouchCancel={() => {
            setIsPress(false);
          }}
          onTouchEnd={() => {
            setIsPress(false);
          }}
        ></MarkerDraggableButton>
        <WriteButton to={"/location/write"} state={markerPos} isVisible={markerPos !== undefined}></WriteButton>
      </MarkerButtonContainer>
      {markerPos && <Marker latitude={markerPos.latitude} longitude={markerPos.longitude}></Marker>}
    </Map>
  );
};

export default MapContainer;

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

const SearchBarContainer = styled.div`
  position: relative;
  padding: 1rem;
`;
