import { ReactNode } from "react";
import { create } from "zustand";
/**
 * 팝업 모달의 타입을 정의합니다.
 * @property {alert} 확인 버튼만 존재하는 팝업
 * @property {confirm} 예, 아니오 버튼이 존재하는 팝업
 * @property {prompt} 입력 필드가 존재하는 팝업 // 미구현
 * @property {fullScreen} 전체 화면 팝업 // 미구현
 * @property {sheet} 화면 일부분을 가리는 시트 팝업 // 미구현
 */
export type PopupModalType = "alert" | "confirm" | "prompt" | "fullScreen" | "sheet";

type PopupContextType = {
  content: ReactNode | null;
  isOpen: boolean;
  type: PopupModalType;
  closeCallback: () => void | undefined;
  confirmCallback: () => void | undefined;

  /**
   * 팝업을 띄우는 함수
   */
  openPopup: (
    content: ReactNode,
    type?: PopupModalType,
    closeCallback?: () => void | undefined,
    confirmCallback?: () => void | undefined
  ) => void;
  /**
   * 팝업을 닫는 함수
   */
  closePopup: (closeCallback?: () => void) => void;
};

/**
 * 팝업을 띄우고 닫는데 사용하는 Store
 * @example const { openPopup, closePopup } = usePopupModalStore();
 */
export const usePopupModalStore = create<PopupContextType>((set, get) => ({
  content: null,
  isOpen: false,
  type: "alert",
  closeCallback: () => undefined,
  confirmCallback: () => undefined,

  /**
   * @param content 팝업에 띄울 내용
   * @param type 팝업 종류
   * @param closeCallback 만약 팝업을 닫을 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 닫을때 자동으로 실행됩니다
   * @param confirmCallback type이 confirm이고 확인 버튼을 누를때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 직접 실행해야 합니다
   */
  openPopup: (
    content: ReactNode,
    type: PopupModalType = "alert",
    closeCallback?: () => void,
    confirmCallback?: () => void
  ) => {
    set({ content, isOpen: true, type, closeCallback, confirmCallback });
  },
  closePopup: () => {
    const { closeCallback } = get();
    set({ content: null, isOpen: false });
    if (closeCallback) closeCallback();
  },
}));
