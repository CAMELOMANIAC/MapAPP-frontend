/**
 * 구글 플레이스 API를 이용하여 주변의 명소 데이터를 가져옵니다.
 *
 * @async
 * @param {number} latitude
 * @param {number} logtitude
 * @returns {unknown}
 */
export const getGooglePlaceData = async (latitude: number, longitude: number) => {
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
