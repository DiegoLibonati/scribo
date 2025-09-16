import { Modal } from "@src/entities/entities";

import { closeModal, openModal } from "@src/slices/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@src/constants/redux";

type UseUiStore = {
  modal: Modal;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const useUiStore = (): UseUiStore => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.ui);

  const handleOpenModal = (): void => {
    dispatch(openModal());
  };

  const handleCloseModal = (): void => {
    dispatch(closeModal());
  };

  return {
    modal: modal,
    handleOpenModal: handleOpenModal,
    handleCloseModal: handleCloseModal,
  };
};
