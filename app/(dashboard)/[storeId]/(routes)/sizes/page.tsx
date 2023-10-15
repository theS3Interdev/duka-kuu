import { format } from "date-fns";

import prismadb from "@/lib/utils/prismadb";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";

type SizesPageProps = {
  params: { storeId: string };
};

const SizesPage = async ({ params }: SizesPageProps) => {
  const heroes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = heroes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
