"use client";
import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const getNotes = async (pageNumber, pageSize, search) => {
    const response = await fetch(
      `http://localhost:4001/notes?search=${encodeURIComponent(
        search
      )}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const { notes, noteCount } = await response.json();
    // console.log(notes);
    return { notes, noteCount };
  };
  return (
    <NoteContext.Provider value={{ getNotes }}>{children}</NoteContext.Provider>
  );
};

// export const getNotes = async (search) => {
//   const response = await fetch(
//     `http://localhost:4001/notes?search=${encodeURIComponent(search)}&pageNumber=${1}&pageSize=${4}`
//   );
//   const { notes, noteCount } = await response.json();
//   return { notes, noteCount };
// };
