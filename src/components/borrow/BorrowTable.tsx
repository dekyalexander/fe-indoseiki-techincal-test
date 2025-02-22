
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

interface Borrow {
  id?: number;
  books_id: string;
  borrower_name: string;
  borrow_date: string;
  return_date: string;
}

export default function BorrowTable() {
  const [borrow, setBorrow] = useState<Borrow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<Borrow | null>(null);
  const [showModal, setShowModal] = useState(false);


  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const token = Cookies.get("token");

 
  useEffect(() => {
    const fetchBorrow = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/borrows`, {
          params: { page, limit: 5, search: searchQuery },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); 

      if (Array.isArray(response.data)) {
        setBorrow(response.data); 
        setTotalPages(1); 
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setBorrow(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.error("Unexpected API response:", response.data);
        setBorrow([]); 
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBorrow([]); 
    }
      setLoading(false);
    };

    fetchBorrow();
  }, [page, searchQuery]);

  // Fungsi untuk menghapus buku
  const handleDelete = async (id: number | undefined) => {
    if (window.confirm("Are you sure you want to delete this borrow?") && id !== undefined) {
      try {
        await axios.delete(`${API_URL}/borrows/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setBorrow(borrow.filter((borrow) =>borrow.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (selectedBorrow?.id) {
        await axios.put(`${API_URL}/borrows/${selectedBorrow.id}`, selectedBorrow, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const response = await axios.post(`${API_URL}/borrows`, selectedBorrow, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBorrow([...borrow, response.data]);
      }
      setShowModal(false);
      setSelectedBorrow(null);
    } catch (error) {
      console.error("Error saving borrow:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => { setSelectedBorrow({ books_id: "", borrower_name: "", borrow_date: "", return_date: "" }); setShowModal(true); }}>Add Borrow</button>
      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
        {/* <FiSearch className="text-gray-500" /> */}
        <input
          type="text"
          placeholder="Search borrow..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {loading ? (
            <p className="text-center py-4">Loading borrow...</p>
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
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {borrow.map((borrow, index) => (
                  <TableRow key={borrow.id ?? `book-${index}`}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {borrow.books_id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrow.borrower_name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrow.borrow_date}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {borrow.borrow_date}
                    </TableCell>
                    {/* Action Buttons */}
                    <TableCell className="px-4 py-3 flex gap-3">
                      <button onClick={() => { setSelectedBorrow(borrow); setShowModal(true); }} className="text-blue-500 hover:text-blue-700">
                        {/* <FiEdit size={18} /> */}
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(borrow.id)}
                      >
                        {/* <FiTrash2 size={18} /> */}
                        Delete
                      </button>
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

     {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">{selectedBorrow?.id ? "Edit Book" : "Add Book"}</h2>
          <input type="text" placeholder="Books" value={selectedBorrow?.books_id || ""} onChange={(e) => setSelectedBorrow({ ...selectedBorrow!, books_id: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="text" placeholder="Borrow Name" value={selectedBorrow?.borrower_name || ""} onChange={(e) => setSelectedBorrow({ ...selectedBorrow!, borrower_name: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="text" placeholder="Borrow Date" value={selectedBorrow?.borrow_date || ""} onChange={(e) => setSelectedBorrow({ ...selectedBorrow!, borrow_date: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="text" placeholder="Return Date" value={selectedBorrow?.return_date || ""} onChange={(e) => setSelectedBorrow({ ...selectedBorrow!, return_date: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <div className="flex justify-end mt-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
