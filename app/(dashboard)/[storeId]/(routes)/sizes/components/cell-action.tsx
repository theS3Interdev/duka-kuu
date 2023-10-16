"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AlertModal } from "@/components/modals/alert-modal";

import { SizeColumn } from "./columns";

type CellActionProps = {
  data: SizeColumn;
};

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const params = useParams();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);

      toast.success("The product size was deleted.");

      router.refresh();
    } catch (error) {
      toast.error("Remove associated products before deleting this size.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Size ID copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Size ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Size
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Size
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
