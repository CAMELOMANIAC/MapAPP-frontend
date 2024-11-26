import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Form, Label, PageContainer, Textarea } from "../assets/styles/CommonStyle";
import { getErrors, isMobile } from "../utils/functions/commons";
import { useForm } from "react-hook-form";
import useAlertModal from "../utils/hooks/useAlertModal";
import AlertModal from "../components/AlertModal";
import { createPortal } from "react-dom";
import { IoMdCamera } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import EXIF from "exif-js";
import useCompassData from "../utils/hooks/useCompassData";
import { useUserDataStore } from "../utils/stores/userStore";
import { useLocation } from "react-router-dom";

type FormType = {
  content: string;
};

const storage = window.localStorage;

const Write = () => {
  const [photo, setPhoto] = useState<string | null>(null); //base64로 인코딩된 이미지
  const [alertMessage, setAlertMessage] = useState("");
  const exifRef = useRef();
  const heading = useCompassData();
  const [photoDirection, setPhotoDirection] = useState<number>();
  const { location } = useUserDataStore((state) => ({
    location: state.location,
  }));
  const locat = useLocation();
  const { state } = locat;
  console.log("state", state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  const onSubmit = (data: any) => {
    if (photo) {
      data.photo = photo;
      //이미지가 있으면 data에 photo라는 키로 base64로 인코딩된 이미지를 추가(일반적이라면 이미지를 이미지 서버에 저장하고 그 경로를 업로드 해야하지만 지금은 base64로 인코딩된 이미지 문자열 업로드)
      console.log("Form Data:", data, "사진방향", photoDirection);
      storage.setItem(
        "photo",
        JSON.stringify({ photo: data.photo, photoDirection: photoDirection, location: location })
      );
    } else {
      setAlertMessage("이미지를 업로드 해야합니다");
    }
  };

  useEffect(() => {
    if (photo) {
      // EXIF 데이터 읽기
      const img = new Image();
      img.src = photo;
      setPhotoDirection(heading);
      img.onload = () => {
        EXIF.getData(photo, (el: HTMLImageElement) => {
          const allMetaData = EXIF.getAllTags(el);
          exifRef.current = allMetaData;
        });
      };
    }
  }, [photo]); // eslint-disable-line react-hooks/exhaustive-deps

  //모달 관리 커스텀후크
  const { closeModal, isOpen, openModal } = useAlertModal();
  const modalCloseHandler = () => {
    closeModal();
    setAlertMessage("");
  };
  useEffect(() => {
    if (getErrors(errors) !== "") {
      setAlertMessage(getErrors(errors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.content?.message]);

  useEffect(() => {
    if (alertMessage !== "") {
      openModal();
    }
  }, [alertMessage, openModal]);

  //takePhoto 함수는 비동기함수이므로 이벤트 핸들러로 사용할때는 함수를 한번 더 감싸줘야함
  const handleTakePhoto = () => {
    takePhoto(setPhoto);
  };
  const handleChoosePhoto = () => {
    choosePhoto(setPhoto);
  };

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitleH1Ins>새 글을 작성할까요?</PageTitleH1Ins>
        <SubmitButton onClick={handleSubmit(onSubmit)}>작성하기</SubmitButton>
      </TitleContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label htmlFor="content">내용</Label>
            <Textarea
              {...register("content", {
                required: { value: true, message: "내용을 입력해주세요" },
              })}
              placeholder="내용을 입력해주세요"
              id="content"
            ></Textarea>
          </InputContainer>
        </Form>

        {photo && <img src={photo} alt="pick_image" />}
        <PhotoButtonContainer>
          {isMobile() && (
            <TakePhotoButton onClick={handleTakePhoto}>
              카메라
              <IoMdCamera />
            </TakePhotoButton>
          )}
          <ChoosePhotoButton onClick={handleChoosePhoto}>
            사진 선택
            <AiFillPicture />
          </ChoosePhotoButton>
        </PhotoButtonContainer>
      </FormContainer>

      {createPortal(
        <AlertModal isOpen={isOpen} closeModal={modalCloseHandler}>
          {alertMessage}
        </AlertModal>,
        document.body
      )}
    </PageContainer>
  );
};

export default Write;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const PageTitleH1Ins = styled.h1`
  margin: 0;
`;

const SubmitButton = styled.button`
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const PhotoButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TakePhotoButton = styled.button`
  font-size: 2rem;
`;
const ChoosePhotoButton = styled.button`
  font-size: 2rem;
`;

//카메라로 사진 찍기
const takePhoto = async (setPhoto: (dataUrl: string) => void) => {
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
const choosePhoto = async (setPhoto: (dataUrl: string) => void) => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // 갤러리에서 사진 선택
    });

    image.dataUrl && setPhoto(image.dataUrl);
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
