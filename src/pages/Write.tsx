import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
import styled from "styled-components";

const Write = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  //navigator.mediaDevices.getUserMedia({ video: true });
  const isMobile = () => {
    const userAgent = navigator.userAgent;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
  };

  const isIOS = () => {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/i.test(userAgent);
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera, // 갤러리에서 사진 선택
    });

    image.dataUrl && setPhoto(image.dataUrl);
  };

  const choosePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // 갤러리에서 사진 선택
    });

    image.dataUrl && setPhoto(image.dataUrl);
  };

  return (
    <div>
      <>{isMobile() ? "모바일" : "데스크탑"}</>
      <>{isIOS() ? "IOS" : "not IOS"}</>
      <TakePhotoButton onClick={takePhoto}>사진찍기</TakePhotoButton>
      <ChoosePhotoButton onClick={choosePhoto}>사진첩에서 고르기</ChoosePhotoButton>
      {photo && <img src={photo} alt="pick_image" />}
    </div>
  );
};

export default Write;

const TakePhotoButton = styled.button`
  background-color: blue;
`;
const ChoosePhotoButton = styled.button`
  background-color: red;
`;
