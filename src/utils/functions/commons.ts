import { FieldErrors, FieldValues } from "react-hook-form";

/**
 * @description react-hook-form의 errors 객체를 받아서 에러메세지를 리턴하는 함수
 * @param errors react-hook-form의 errors 객체
 * @returns string 에러메세지
 */
export const getErrors = <T extends FieldValues>(errors: FieldErrors<T>) => {
  let error = "";
  for (const key in errors) {
    error = String(errors[key as keyof T]?.message);
  }
  return error;
};

/**
 * @Description 현재 디바이스가 모바일인지 확인하는 함수
 *
 * @returns boolean
 */
export const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /android|iPad|iPhone|iPod/i.test(userAgent);
};

/**
 * @Description 현재 디바이스가 애플기기인지 확인하는 함수
 *
 * @returns boolean
 */
export const isApple = () => {
  const userAgent = navigator.userAgent;
  return /iPad|iPhone|iPod/i.test(userAgent);
};
