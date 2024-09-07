import { FieldErrors, FieldValues } from "react-hook-form";

/**
 * react-hook-form의 errors 객체를 받아서 에러메세지를 리턴하는 함수
 * @param errors react-hook-form의 errors 객체
 * @returns {string} 에러메세지
 */
export const getErrors = <T extends FieldValues>(errors: FieldErrors<T>) => {
  let error = "";
  for (const key in errors) {
    error = String(errors[key as keyof T]?.message);
  }
  return error;
};

/**
 * 현재 디바이스가 모바일인지 확인하는 함수
 *
 * @returns {boolean}
 */
export const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /android|iPad|iPhone|iPod/i.test(userAgent);
};

/**
 * 현재 디바이스가 애플기기인지 확인하는 함수
 *
 * @returns {boolean}
 */
export const isApple = () => {
  const userAgent = navigator.userAgent;
  return /iPad|iPhone|iPod/i.test(userAgent);
};

/**
 * 현재 디바이스가 웹뷰인지 확인하는 함수
 *
 * @returns {boolean}
 */
export const isWebView = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  // iOS 웹뷰 확인
  if (/iPhone|iPod|iPad/.test(userAgent) && /AppleWebKit/.test(userAgent) && !/Safari/.test(userAgent)) {
    return true;
  }
  // Android 웹뷰 확인
  if (/Android/.test(userAgent) && /wv/.test(userAgent)) {
    return true;
  }
  return false;
};
