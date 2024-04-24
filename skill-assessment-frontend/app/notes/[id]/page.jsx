import { notFound } from "next/navigation";
import React from "react";
export const dynamicParams = true;

async function generateStaticParams() {
  // const pageNumber = 1;
  // const pageSize = 4;

  const response = await fetch(`http://localhost:4001/notes`);

  const notes = await response.json();

  return notes.map((note) => ({
    id: note._id,
  }));
}

async function getNote(id) {
  const response = await fetch(`http://localhost:4001/notes/note/${id}`);

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  return data;
}

export default async function NoteDetails({ params }) {
  const note = await getNote(params.id);

  return (
    <main className="max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Note Details</h1>
      <div className="bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-semibold mb-2">{note.title}</h1>
        <p className="text-gray-700 mb-4">{note.content}</p>
        <small className="text-gray-500 block">
          Created At {note.createdAt}
        </small>
      </div>
    </main>
  );
}
