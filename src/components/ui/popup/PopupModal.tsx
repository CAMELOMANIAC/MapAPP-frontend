import { ReactNode } from "react";

import { PopupModalType } from "../../../utils/stores/popupStore";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";

type PopupModalProps = {
  children: ReactNode;
  onClose: () => void;
  type: PopupModalType;
};

/**
 * 이 컴포넌트는 타입을 받아서 적절한 모달을 렌더링 하는 역할만 수행합니다
 */
const PopupModal = ({ children, type, ...props }: PopupModalProps) => {
  const modalElement = {
    alert: <AlertModal {...props}>{children}</AlertModal>,
    confirm: <ConfirmModal {...props}>{children}</ConfirmModal>,
    prompt: <AlertModal {...props}>{children}</AlertModal>,
    fullScreen: <AlertModal {...props}>{children}</AlertModal>,
    sheet: <AlertModal {...props}>{children}</AlertModal>,
  };
  return modalElement[type];
};

export default PopupModal;
