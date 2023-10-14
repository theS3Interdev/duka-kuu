"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", selectedFile);

      if (uploadPreset) {
        formData.append("upload_preset", uploadPreset);
      } else {
        formData.append("upload_preset", "default-duka-kuu");
      }

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        );

        toast.success("Image uploaded successfully.");

        /* set the secure url of the uploaded image */
        setImageUrl(response.data.secure_url);

        /* pass the url to the parent component */
        onChange(response.data.secure_url);
      } catch (error: any) {
        toast.error(`Upload error: ${error.message}`);
      } finally {
        setUploading(false);
      }
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  return (
    <div>
      <div className="mb-4 flex w-full max-w-sm items-center space-x-3">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={uploading}
        />

        <Button onClick={handleFileUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {value.map((imageUrl) => (
        <div
          key={imageUrl}
          className="relative h-[200px] w-[200px] space-y-3 overflow-hidden rounded-md"
        >
          <div className="absolute right-2 top-4 z-10">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(imageUrl)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <Image
            src={imageUrl}
            alt="hero-image"
            fill
            priority
            sizes="100vw"
            className="rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
};
