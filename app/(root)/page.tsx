"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/lib/hooks/use-store-modal";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="m-4">Root Page</div>;
};

export default SetupPage;
