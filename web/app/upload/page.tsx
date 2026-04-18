import type { Metadata } from "next";
import UploadClient from "./upload-client";

export const metadata: Metadata = {
  title: "Send Your Fabric List — Order Wholesale Tela",
  description:
    "Upload or type your fabric list. We source from 50+ Divisoria suppliers and deliver across the Philippines.",
  alternates: { canonical: "/upload" },
  openGraph: {
    title: "Send Your Fabric List — TelaSource PH",
    description: "Upload your list. We source from 50+ Divisoria suppliers.",
    url: "/upload",
  },
};

export default function UploadPage() {
  return <UploadClient />;
}
