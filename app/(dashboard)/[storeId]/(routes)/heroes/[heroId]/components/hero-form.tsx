"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Hero } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/misc/image-upload";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/index";

const formSchema = z.object({
  label: z.string().min(1, { message: "The hero section must have a label." }),
  imageUrl: z
    .string()
    .min(1, { message: "The hero section must have an image." }),
});

type HeroFormValues = z.infer<typeof formSchema>;

type HeroFormProps = {
  initialData: Hero | null;
};

export const HeroForm = ({ initialData }: HeroFormProps) => {
  const params = useParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit hero section" : "Create hero section";

  const description = initialData
    ? "Edit the selected hero section."
    : "Create the desired hero section.";

  const toastMessage = initialData
    ? "Hero section updated."
    : "Hero section created.";

  const action = initialData ? "Save Changes" : "Create Hero Section";

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: "", imageUrl: "" },
  });

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/heroes/${params.heroId}`);

      router.refresh();

      router.push(`/${params.storeId}/heroes`);

      toast.success("Hero section deleted.");
    } catch (error: any) {
      toast.error(
        "Removed all active categories before deleting this hero section.",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: HeroFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        console.log(data);
        await axios.patch(
          `/api/${params.storeId}/heroes/${params.heroId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/heroes/`, data);
      }

      router.refresh();

      router.push(`/${params.storeId}/heroes`);

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("An unknown error has occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
      </div>

      <Separator orientation="vertical" className="my-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Hero section label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
