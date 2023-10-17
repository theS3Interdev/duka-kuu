"use client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/misc/data-table";
import { Heading } from "@/components/heading";

import { columns, OrderColumn } from "./columns";

type OrderClientProps = {
  data: OrderColumn[];
};

export const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage the orders made in your e-commerce store."
      />

      <Separator orientation="vertical" className="my-4" />

      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
