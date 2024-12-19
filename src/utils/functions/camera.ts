import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { isMobile } from "./commons";
//카메라로 사진 찍기
export const takePhoto = async (setPhoto: (dataUrl: string) => void) => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera, // 기본 카메라앱 실행
  });

  if (image.dataUrl) {
    setPhoto(image.dataUrl);
  }
  // 실제 이미지 파일 경로 반환시
  // const image = await Camera.getPhoto({
  //   quality: 90,
  //   allowEditing: false,
  //   resultType: CameraResultType.Uri, // 실제 이미지 파일 경로 반환
  //   source: CameraSource.Camera,
  // });

  // console.log("Image Path:", image.path); // 실제 이미지 파일 경로
};

//갤러리에서 사진 선택
export const choosePhoto = async (setPhoto: (dataUrl: string) => void) => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // 갤러리에서 사진 선택
    });

    if (image.dataUrl) setPhoto(image.dataUrl);
  } catch (error) {
    if (error instanceof Error && error.message === "User cancelled photos app") {
      if (!isMobile) {
        //웹에서 사진 선택 취소시 오류를 던지는데, 웹에서는 몇가지 기능이 없어서 오류를 던지지만 기능상 상관없기 때문에 비워놓음
      }
    } else {
      console.error(error);
    }
  }
};
