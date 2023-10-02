import { ReactNode } from "react";
import type { Metadata } from "next";

import "@/app/styles/globals.css";

type Children = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    shortcut: "/logo/png",
  },
  title: "Duka Kuu Ecommerce Dashboard",
  description:
    "Power your online store with Duka Kuu's robust e-commerce dashboard. Streamline inventory management, order processing, and more.",
};

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body className="scroll-smooth font-opensans antialiased">
        <header>Header Section</header>

        <main>{children}</main>

        <footer>Footer Section</footer>
      </body>
    </html>
  );
};

export default RootLayout;
