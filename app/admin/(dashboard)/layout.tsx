"use client";

import AuthGate from "@/components/admin/AuthGate";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className="flex min-h-[70vh] flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </AuthGate>
  );
}
