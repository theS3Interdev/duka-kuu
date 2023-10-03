"use client";

import { useStoreModal } from "@/lib/hooks/use-store-modal";

import { Modal } from "@/components/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Create a new store."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Proposed Create Store Form
    </Modal>
  );
};
