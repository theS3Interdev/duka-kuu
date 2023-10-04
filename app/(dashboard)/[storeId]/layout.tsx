import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/utils/prismadb";

import { NavigationBar } from "@/components/index";

type DashboardLayoutProps = {
  children: ReactNode;
  params: {
    storeId: string;
  };
};

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { userId } = auth();

  /* check if the user has been authenticated */
  if (!userId) {
    redirect("/sign-in");
  }

  /* check if the store exists */
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  /* if the store doesn't exist redirect to root */
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default DashboardLayout;
