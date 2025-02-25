
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


interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
  year: string;
  stock: string;
}

export default function BooksTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);


  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const token = Cookies.get("token");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/books`, {
        params: { page, limit: 5, search: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data); 

    if (Array.isArray(response.data)) {
      setBooks(response.data); 
      setTotalPages(1); 
    } else if (response.data.data && Array.isArray(response.data.data)) {
      setBooks(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } else {
      console.error("Unexpected API response:", response.data);
      setBooks([]); 
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    setBooks([]); 
  }
    setLoading(false);
  };

 
  useEffect(() => {
    
    fetchBooks();
  }, [page, searchQuery]);

  // Fungsi untuk menghapus buku
  const handleDelete = async (id: number | undefined) => {
    if (window.confirm("Are you sure you want to delete this book?") && id !== undefined) {
      try {
        await axios.delete(`${API_URL}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setBooks(books.filter((book) => book.id !== id));

        fetchBooks();
        toast.success("Book delete successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        toast.error("Failed to delete book. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (selectedBook?.id) {
        await axios.put(`${API_URL}/books/${selectedBook.id}`, selectedBook, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Book updated successfully!");
      } else {
        const response = await axios.post(`${API_URL}/books`, selectedBook, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks([...books, response.data]);
        toast.success("Book added successfully!");
      }
      fetchBooks();
      setShowModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book. Please try again.");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => { setSelectedBook({ title: "", author: "", description: "", year: "", stock: "" }); setShowModal(true); }}>Add Book</button>
      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
        {/* <FiSearch className="text-gray-500" /> */}
        <input
          type="text"
          placeholder="Search books..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {loading ? (
            <p className="text-center py-4">Loading books...</p>
          ) : (
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                   Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Author
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                   Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Year
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Stock
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
                {books.map((book, index) => (
                  <TableRow key={book.id ?? `book-${index}`}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {book.title}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {book.author}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {book.year}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {book.description}
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {book.stock}
                    </TableCell>
                    {/* Action Buttons */}
                    <TableCell className="px-4 py-3 flex gap-3">
                      <button onClick={() => { setSelectedBook(book); setShowModal(true); }} className="text-blue-300 hover:text-blue-300mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                        {/* <FiEdit size={18} /> */}
                        Edit
                      </button>
                      <button
                        className="text-red-300 hover:text-red-300mb-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(book.id)}
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
          <h2 className="text-lg font-bold mb-4">{selectedBook?.id ? "Edit Book" : "Add Book"}</h2>
          <label className="w-full mb-2 p-2">Title</label>
          <input type="text" placeholder="Title" value={selectedBook?.title || ""} onChange={(e) => setSelectedBook({ ...selectedBook!, title: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <label className="w-full mb-2 p-2">Author</label>
          <input type="text" placeholder="Author" value={selectedBook?.author || ""} onChange={(e) => setSelectedBook({ ...selectedBook!, author: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <label className="w-full mb-2 p-2">Description</label>
          <input type="text" placeholder="Description" value={selectedBook?.description || ""} onChange={(e) => setSelectedBook({ ...selectedBook!, description: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <label className="w-full mb-2 p-2">Year</label>
          <input type="text" placeholder="Year" value={selectedBook?.year || ""} onChange={(e) => setSelectedBook({ ...selectedBook!, year: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <label className="w-full mb-2 p-2">Stock</label>
          <input type="text" placeholder="Stock" value={selectedBook?.stock || ""} onChange={(e) => setSelectedBook({ ...selectedBook!, stock: e.target.value })} className="w-full mb-2 p-2 border rounded" />
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
