import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/borrow/BorrowTable";

import React from "react";

export default function Borrow() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Borrow" />
      <div className="space-y-6">
        <ComponentCard title="List Data Borrow">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
