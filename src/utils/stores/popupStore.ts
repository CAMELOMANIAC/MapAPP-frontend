import { ReactNode } from "react";
import { create } from "zustand";

/**
 * 팝업 모달의 타입을 정의합니다.
 * - `alert`: 확인 버튼만 존재하는 팝업
 * - `confirm`: 예, 아니오 버튼이 존재하는 팝업
 * - `prompt`: 입력 필드가 존재하는 팝업 (미구현)
 * - `fullScreen`: 전체 화면 팝업
 * - `sheet`: 화면 일부분을 가리는 시트 팝업
 */
export type PopupModalType = "alert" | "confirm" | "prompt" | "fullScreen" | "sheet";

type PopupState = {
  content: ReactNode | null;
  isOpen: boolean;
  type: PopupModalType;
  closeCallback: () => void | undefined;
  confirmCallback: () => void | undefined;
};

type PopupActions = {
  openPopup: (
    content: ReactNode,
    type?: PopupModalType,
    closeCallback?: () => void | undefined,
    confirmCallback?: () => void | undefined
  ) => void;
  closePopup: (closeCallback?: () => void) => void;
};

const usePopupModalStore = create<PopupState & PopupActions>((set, get) => ({
  content: null,
  isOpen: false,
  type: "alert",
  closeCallback: () => undefined,
  confirmCallback: () => undefined,

  openPopup: (
    content: ReactNode,
    type: PopupModalType = "alert",
    closeCallback?: () => void,
    confirmCallback?: () => void
  ) => {
    set({ content, isOpen: true, type, closeCallback, confirmCallback });
  },
  closePopup: () => {
    set({ content: null, isOpen: false });
    const { closeCallback } = get();
    if (closeCallback) closeCallback();
  },
}));

/**
 * 팝업 모달의 상태를 반환합니다.
 * @returns content - 팝업에 띄울 내용
 * @returns isOpen - 팝업이 열려 있는지 여부
 * @returns type - 팝업 종류
 * @returns closeCallback - 팝업을 닫을 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 닫을 때 자동으로 실행됩니다
 * @returns confirmCallback - type이 confirm이고 확인 버튼을 누를 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 직접 실행해야 합니다
 */
export const usePopupState = () =>
  usePopupModalStore<PopupState>((state) => ({
    content: state.content,
    isOpen: state.isOpen,
    type: state.type,
    closeCallback: state.closeCallback,
    confirmCallback: state.confirmCallback,
  }));

/**
 * 팝업 모달의 액션을 반환합니다.
 * @returns openPopup - 팝업을 엽니다
 * @returns closePopup - 팝업을 닫습니다
 */
export const usePopupActon = () =>
  usePopupModalStore<PopupActions>((state) => ({
    openPopup: state.openPopup,
    closePopup: state.closePopup,
  }));
