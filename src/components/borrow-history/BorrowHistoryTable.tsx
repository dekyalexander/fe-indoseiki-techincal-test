
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface borrowHistory {
  id?: number;
  books_id: string;
  title?: string;
  borrower_name: string;
  borrow_date: string;
  return_date: string;
}

export default function BorrowTable() {
  const [borrowHistory, setBorrowHistory] = useState<borrowHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);



  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const token = Cookies.get("token");

  // Fetching Data Borrow

  const fetchBorrowHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/borrows-history`, {
        params: { page, limit: 5, search: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data); 

    if (Array.isArray(response.data)) {
      setBorrowHistory(response.data); 
      setTotalPages(1); 
    } else if (response.data.data && Array.isArray(response.data.data)) {
      setBorrowHistory(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } else {
      console.error("Unexpected API response:", response.data);
      setBorrowHistory([]); 
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    setBorrowHistory([]); 
  }
    setLoading(false);
  };

  useEffect(() => {
    fetchBorrowHistory();
  }, [page, searchQuery]);


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
        {/* <FiSearch className="text-gray-500" /> */}
        <input
          type="text"
          placeholder="Search borrow history..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {loading ? (
            <p className="text-center py-4">Loading borrowing history...</p>
          ) : (
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                   Books
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                   Borrow Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Borrow Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Return Date
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {borrowHistory.map((borrow, index) => (
                  <TableRow key={borrow.id ?? `book-${index}`}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {borrow.title}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrow.borrower_name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrow.borrow_date}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {borrow.return_date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4">
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
  </div>
);
}
