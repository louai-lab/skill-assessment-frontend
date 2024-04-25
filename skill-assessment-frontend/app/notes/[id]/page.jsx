"use client";

import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";
export const dynamicParams = true;
import { formatDateTime } from "@/Utils/DateUtils";

async function getNote(id) {
  try {
    const response = await fetch(`http://localhost:4001/notes/note/${id}`);
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default function NoteDetails({ params }) {
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState();
  const [note, setNote] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const fetchedNote = await getNote(params.id);
        setNote(fetchedNote);
        setEditedNote({
          title: fetchedNote?.title || "",
          content: fetchedNote?.content || "",
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Note not found");
        } else {
          console.error("Error fetching note:", error.message);
          setError("Failed to fetch note. Please try again later."); // Generic error message
        }
      }
    }

    fetchNote();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleOpenPopUpEdit = (id) => {
    setShowEdit(true);
    setId(id);
  };

  // Save the note after editing
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/notes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: editedNote.title,
          content: editedNote.content,
        }),
      });

      if (response.ok) {
        console.log("Edit successfully");
        setNote({
          ...note,
          title: editedNote.title,
          content: editedNote.content,
        });
        setShowEdit(false);
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const formattedCreatedAt = formatDateTime(note?.createdAt);
  const formattedUpdatedAt = formatDateTime(note?.updatedAt);

  return (
    <>
      {showEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl font-semibold mb-2">Edit Note</h1>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="title"
                >
                  Title :
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedNote.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="content"
                >
                  Content :
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={editedNote.content}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <main style={{ padding: "20px", width: "300px" }}>
        <div
          className="flex justify-between mb-4"
          style={{
            width: "-webkit-fill-available",
            alignItems: "flex-start",
          }}
        >
          <h1 className="text-3xl font-bold mb-4">Note Details</h1>
          <button
            onClick={() => handleOpenPopUpEdit(note._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
        </div>

        {/* <div className="bg-white rounded-md shadow-md p-6"> */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "fitContent",
            padding:"20px",
            width:"260px"
          }}
        >
          <h1 className="text-xl font-semibold mb-2">{note?.title}</h1>
          <p className="text-gray-700 mb-4">{note?.content}</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <small className="text-gray-500 mt-2">
              Created At {formattedCreatedAt}
            </small>
            <small className="text-gray-500 mt-2">
              Updated AT {formattedUpdatedAt}
            </small>
          </div>
        </div>
      </main>
    </>
  );
}
