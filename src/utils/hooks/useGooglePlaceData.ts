import { useQuery } from "@tanstack/react-query";

/**
 * 구글 플레이스 API를 이용하여 주변의 명소 데이터를 가져옵니다.
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {Object} data - 명소 데이터
 */
const useGooglePlaceData = (latitude: number, longitude: number) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["googlePlaceData", latitude, longitude],
    queryFn: () => getGooglePlaceData(latitude, longitude),
    staleTime: 1000 * 60,
  });
  return { data, isSuccess };
};

export default useGooglePlaceData;

const getGooglePlaceData = async (latitude: number, longitude: number) => {
  const API_URL = "https://places.googleapis.com/v1/places:searchNearby";
  const FIELD_MASK = "places.displayName,places.formattedAddress,places.photos,places.location";
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.REACT_APP_GOGGLE_MAP_KEY || "",
    "X-Goog-FieldMask": FIELD_MASK,
  });

  const body = JSON.stringify({
    includedTypes: ["historical_landmark"],
    includedPrimaryTypes: ["historical_landmark"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius: 2000.0,
      },
    },
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    } else {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
