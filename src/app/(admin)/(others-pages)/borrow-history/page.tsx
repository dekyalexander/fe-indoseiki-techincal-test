import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/borrow-history/BorrowHistoryTable";

import React from "react";

export default function BorrowHistory() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Borrowing History" />
      <div className="space-y-6">
        <ComponentCard title="List Data Borrowing History">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
