import type { UseUiStore } from "@/types/hooks";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { closeModal, openModal } from "@/features/ui/uiSlice";

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
