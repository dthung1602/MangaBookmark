import { useState, useCallback } from "react";

const useModal = (initVisible = false) => {
  const [visible, setVisible] = useState(initVisible);
  const closeModal = useCallback(() => setVisible(false), [setVisible]);
  const openModal = useCallback(() => setVisible(true), [setVisible]);
  return { visible, closeModal, openModal };
};

export default useModal;
