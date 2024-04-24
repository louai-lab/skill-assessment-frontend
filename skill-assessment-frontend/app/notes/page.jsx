"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

async function getNotes() {
  const pageNumber = 1;
  const pageSize = 4;

  const response = await fetch(
    `http://localhost:4001/notes?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  const data = await response.json();
  return data;
}

export default function NotesPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setId] = useState();
  const [notes, setNotes] = useState([]);

  // const router = useRouter()

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    };

    fetchNotes();
  }, []);

  const handleOpenPopUpDelete = (id) => {
    setShowConfirm(true);
    setId(id);
    // console.log(id);
  };

  const handleClosePopUpDelete = () => {
    setShowConfirm(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4001/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        setShowConfirm(false);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      {showConfirm && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md shadow-md p-6">
              <h1 className="text-xl font-semibold text-red-500">
                Confirmation
              </h1>
              <p>Are you sure you want to delete this note?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleClosePopUpDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={handleDelete} // Replace with delete logic
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          {/* <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1002,
            }}
            onClick={handleClosePopUpDelete}
          ></div> */}
        </>
      )}
      <div className="py-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Notes</h1>
          <Link
            href={"/notes/create"}
            className="bg-green-500 text-white px-4 py-2 text-xl font-bold rounded-md transition-opacity hover:opacity-75"
          >
            + Add Note
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="relative">
              <button
                onClick={() => handleOpenPopUpDelete(note._id)}
                className="absolute top-2 right-2 bg-white shadow-md rounded-full p-2  hover:opacity-50 focus:outline-none transition-opacity duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="red"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                  />
                </svg>
              </button>

              <Link href={`/notes/${note._id}`}>
                <div className="bg-white rounded-md shadow-md p-4">
                  <h3 className="text-xl font-semibold mt-2">{note.title}</h3>
                  <p className="text-gray-500 mt-2">
                    Created At {note.createdAt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
