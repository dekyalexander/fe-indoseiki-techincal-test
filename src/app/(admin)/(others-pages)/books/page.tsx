import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/books/BooksTable";

import React from "react";

export default function Books() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Books" />
      <div className="space-y-6">
        <ComponentCard title="List Data Books">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
