"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APIList } from "@/components/misc/api-list";
import { DataTable } from "@/components/misc/data-table";
import { Heading } from "@/components/index";

import { columns, SizeColumn } from "./columns";

type SizeClientProps = {
  data: SizeColumn[];
};

export const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();

  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage the product sizes for your e-commerce store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Manage
        </Button>
      </div>

      <Separator orientation="vertical" className="my-4" />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for product sizes." />

      <Separator orientation="vertical" className="my-4" />

      <APIList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
