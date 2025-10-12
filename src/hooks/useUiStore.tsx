import { UseUiStore } from "@src/entities/hooks";

import { closeModal, openModal } from "@src/features/ui/uiSlice";

import { useAppDispatch, useAppSelector } from "@src/app/hooks";

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
