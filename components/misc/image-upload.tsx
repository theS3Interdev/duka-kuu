"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image
              src={url}
              alt="hero-image"
              fill
              priority
              sizes="100vw"
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="default-duka-kuu">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload Hero Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
