import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLoginPage() {
  // useSearchParams needs a Suspense boundary to stay statically renderable.
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <AdminLogin />
    </Suspense>
  );
}
