"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Color } from "@prisma/client";

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
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/index";

const formSchema = z.object({
  name: z.string().min(1, { message: "The product color must have a name." }),
  value: z
    .string()
    .min(4, {
      message: "The product value must be at least 4 characters in length.",
    })
    .max(7, {
      message: "The product value must be at most 7 characters in length.",
    })
    .regex(/^#/, {
      message: "The product value must be a valid hexadecimal code.",
    }),
});

type ColorFormValues = z.infer<typeof formSchema>;

type ColorFormProps = {
  initialData: Color | null;
};

export const ColorForm = ({ initialData }: ColorFormProps) => {
  const params = useParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product color" : "Create a product color";

  const description = initialData
    ? "Edit the selected product color."
    : "Create the desired product color.";

  const toastMessage = initialData
    ? "Product color updated."
    : "Product color created.";

  const action = initialData ? "Save Changes" : "Create Product Color";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

      router.refresh();

      router.push(`/${params.storeId}/colors`);

      toast.success("Product color deleted.");
    } catch (error: any) {
      toast.error("Remove associated products before deleting this color.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        console.log(data);
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors/`, data);
      }

      router.refresh();

      router.push(`/${params.storeId}/colors`);

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
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
