"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APIList } from "@/components/misc/api-list";
import { DataTable } from "@/components/misc/data-table";
import { Heading } from "@/components/index";

import { columns, CategoryColumn } from "./columns";

type CategoryClientProps = {
  data: CategoryColumn[];
};

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const params = useParams();

  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product categories (${data.length})`}
          description="Manage the product categories for your e-commerce store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Manage
        </Button>
      </div>

      <Separator orientation="vertical" className="my-4" />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for product categories." />

      <Separator orientation="vertical" className="my-4" />

      <APIList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
