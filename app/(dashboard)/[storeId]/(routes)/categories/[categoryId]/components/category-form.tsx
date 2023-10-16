"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Category, Hero } from "@prisma/client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/index";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The product category must have a valid name." }),
  heroId: z.string().min(1, { message: "Please select a hero section." }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  initialData: Category | null;
  heroes: Hero[];
};

export const CategoryForm = ({ initialData, heroes }: CategoryFormProps) => {
  const params = useParams();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const title = initialData
    ? "Edit product category."
    : "Create a product category.";

  const description = initialData
    ? "Edit the selected product category."
    : "Create the desired product category.";

  const toastMessage = initialData
    ? "Product category updated."
    : "Product category created.";

  const action = initialData ? "Save changes" : "Create Product Category";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      heroId: "",
    },
  });

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );

      router.refresh();

      router.push(`/${params.storeId}/categories`);

      toast.success("Product category deleted.");
    } catch (error: any) {
      toast.error("Remove associated products before deleting this category.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        console.log(data);
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories/`, data);
      }

      router.refresh();

      router.push(`/${params.storeId}/categories`);

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
                      placeholder="Product category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heroId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Section</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a hero section"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {heroes.map((hero) => (
                        <SelectItem key={hero.id} value={hero.id}>
                          {hero.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
