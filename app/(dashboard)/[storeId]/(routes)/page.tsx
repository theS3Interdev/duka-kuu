import prismadb from "@/lib/utils/prismadb";

type DashboardPageProps = {
  params: {
    storeId: string;
  };
};

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>The Active Store is {store?.name} </div>;
};

export default DashboardPage;
