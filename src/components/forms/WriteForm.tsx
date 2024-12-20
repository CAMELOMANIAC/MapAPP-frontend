import { forwardRef, useImperativeHandle, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { AiFillPicture } from "react-icons/ai";
import { IoMdCamera } from "react-icons/io";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Form, Label, Textarea } from "../../assets/styles/CommonStyle";
import { choosePhoto, takePhoto } from "../../utils/functions/camera";
import { isMobile } from "../../utils/functions/commons";
import { useToastStore } from "../../utils/stores/toastStore";
const storage = window.localStorage;

type FormType = {
  photo: string;
  content: string;
  location: string;
};

const WriteForm = forwardRef((_props, ref) => {
  const [photo, setPhoto] = useState<string | null>(null); //base64로 인코딩된 이미지
  const location = useLocation();
  const { addToast } = useToastStore((state) => ({ addToast: state.addToast }));
  const { register, handleSubmit } = useForm<FormType>({ mode: "onSubmit" });

  const onSubmit = (data: FormType) => {
    if (photo) {
      data.photo = photo;
      storage.setItem("photo", JSON.stringify({ photo: data.photo, location: location.state }));
    }
    addToast("글을 작성했어요", "success");
  };
  const onError = (errors: FieldErrors<FormType>) => {
    // 에러가 발생하면 토스트 메시지를 띄움
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, "warning");
      }
    });
  };

  //부모 컴포넌트에서 ref로 form의 submit 함수를 호출할 수 있도록 함
  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onSubmit, onError),
  }));

  //takePhoto 함수는 비동기함수이므로 이벤트 핸들러로 사용할때는 함수를 한번 더 감싸줘야함
  const handleTakePhoto = () => {
    takePhoto(setPhoto);
  };
  const handleChoosePhoto = () => {
    choosePhoto(setPhoto);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputContainer>
          <Label htmlFor="content">내용</Label>
          <Textarea
            {...register("content", {
              required: { value: true, message: "내용을 입력해주세요" },
              maxLength: { value: 500, message: "500자 이내로 입력해주세요" },
              minLength: { value: 10, message: "10자 이상 입력해주세요" },
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
  );
});

WriteForm.displayName = "WriteForm";
export default WriteForm;

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
