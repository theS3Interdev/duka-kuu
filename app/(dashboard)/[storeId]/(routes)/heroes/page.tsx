import { format } from "date-fns";

import prismadb from "@/lib/utils/prismadb";

import { HeroClient } from "./components/client";
import { HeroColumn } from "./components/columns";

type HeroSectionsPageProps = {
  params: { storeId: string };
};

const HeroSectionsPage = async ({ params }: HeroSectionsPageProps) => {
  const heroes = await prismadb.hero.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedHeros: HeroColumn[] = heroes.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeroClient data={formattedHeros} />
      </div>
    </div>
  );
};

export default HeroSectionsPage;
