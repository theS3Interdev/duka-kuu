import { ReactNode } from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/lib/providers/modal-provider";

import "@/app/styles/globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    shortcut: "/logo/png",
  },
  title: "Dashboard | Duka Kuu",
  description:
    "Power your online store with Duka Kuu's robust e-commerce dashboard. Streamline inventory management, order processing, and more.",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="scroll-smooth font-opensans antialiased">
          <ModalProvider />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
