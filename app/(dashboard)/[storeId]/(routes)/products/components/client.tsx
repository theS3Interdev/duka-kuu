"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APIList } from "@/components/misc/api-list";
import { DataTable } from "@/components/misc/data-table";
import { Heading } from "@/components/index";

import { columns, ProductColumn } from "./columns";

type ProductClientProps = {
  data: ProductColumn[];
};

export const ProductClient = ({ data }: ProductClientProps) => {
  const params = useParams();

  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage the products of your e-commerce store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Manage
        </Button>
      </div>

      <Separator orientation="vertical" className="my-4" />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for products." />

      <Separator orientation="vertical" className="my-4" />

      <APIList entityName="products" entityIdName="productId" />
    </>
  );
};
