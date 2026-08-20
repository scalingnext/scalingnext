import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

// Access is gated by Basic Auth in middleware.ts before this route renders.
export const metadata: Metadata = {
  title: "Admin",
  // Belt and braces alongside the auth gate: never let this appear in search.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
