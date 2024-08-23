import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataStore } from "../utils/stores/userStore";
import Map, { NavigationControl, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { userName } = useUserDataStore((state) => ({
    userName: state.userName,
  }));

  //로그인이 되어있지 않다면 로그인 페이지로 이동
  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [navigate, userName]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Map
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: location?.latitude ?? 37.5326,
          longitude: location?.longitude ?? 127.024612,
          zoom: 14,
        }}
        // onMove={(event) => {setViewState(event.viewState)}}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <NavigationControl position="top-right" />
        <TestMapButton location={location} />
      </Map>
    </>
  );
};

export default Home;

const TestButtons = styled.button`
  position: absolute;
  z-index: 1;
`;

type TestMapButtonProps = {
  location: { latitude: number; longitude: number } | null;
};
const TestMapButton = ({ location }: TestMapButtonProps) => {
  const { current: map } = useMap();
  const onClickHandler = () => {
    if (location) {
      map?.flyTo({ center: [location.longitude, location.latitude] });
    }
  };

  useEffect(() => {
    if (location) {
      map?.flyTo({ center: [location.longitude, location.latitude] });
    }
  }, [location, map]);

  return <TestButtons onClick={onClickHandler}>현재 위치로</TestButtons>;
};
