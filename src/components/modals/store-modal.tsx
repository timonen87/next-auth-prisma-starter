"use client";

import { useStoreModal } from "../../../hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Создать категорию"
      description="Добавить описание для новой категории"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Form Store
    </Modal>
  );
};
