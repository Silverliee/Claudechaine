import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { type ReactNode } from "react";

import HeaderComponent from "@/components/target/header";
import FooterComponent from "@/components/target/footer";

export const metadata: Metadata = {
  title: "Create Wagmi",
  description: "Generated by create-wagmi",
};

export default async function RootLayout(props: { children: ReactNode }) {
  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <div className="container mx-auto">{props.children}</div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
}
