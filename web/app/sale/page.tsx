import type { Metadata } from "next";
import SaleClient from "./sale-client";

export const metadata: Metadata = {
  title: "Soft Opening Sale — Fabric Promos in Divisoria",
  description:
    "Soft opening special: launch prices on every fabric. Wholesale tela from Divisoria — limited stock.",
  alternates: { canonical: "/sale" },
  openGraph: {
    title: "Soft Opening Sale — TelaSource PH",
    description:
      "Launch prices on every fabric. Wholesale tela from Divisoria — limited stock.",
    url: "/sale",
  },
};

export default function SalePage() {
  return <SaleClient />;
}
