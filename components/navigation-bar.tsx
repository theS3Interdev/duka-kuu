import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, UserButton } from "@clerk/nextjs";

import prismadb from "@/lib/utils/prismadb";

import { MainNavigation } from "@/components/main-navigation";
import { StoreSwitcher } from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const NavigationBar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-3">
          {/* logo section start */}
          <Link href="/">
            <h1 className="font-montserrat text-xl font-bold">Soko Kuu</h1>
          </Link>
          {/* logo section end */}

          {/* store switcher section start */}
          <StoreSwitcher items={stores} />
          {/* store switcher section start */}

          {/* main navigation section start */}
          <MainNavigation className="mx-6" />
          {/* main navigation section start */}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
