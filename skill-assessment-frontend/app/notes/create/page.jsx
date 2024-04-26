"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function createPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  // function add note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response) {
        setTitle("");
        setContent("");
        router.push("/notes");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mt-8 p-6 bg-white shadow-md rounded-md"
    >
      <h3 className="text-xl font-semibold mb-4">Create a new Note</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create note
      </button>
    </form>
  );
}
