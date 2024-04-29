import React from "react";
import { render, act } from "@testing-library/react";
import { NoteProvider, useNoteContext } from "./DataContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        notes: [
          { id: 1, title: "Note 1", content: "Content 1" },
          { id: 2, title: "Note 2", content: "Content 2" },
          { id: 3, title: "Note 3", content: "Content 3" },
          { id: 4, title: "Note 4", content: "Content 4" },
        ],
        noteCount: 4,
      }),
  })
);

describe("NoteProvider", () => {
  it("provides getNotes function in context", async () => {
    let getNotes;

    const TestComponent = () => {
      const { getNotes: contextGetNotes } = useNoteContext();
      getNotes = contextGetNotes;
      return null;
    };

    await act(async () => {
      render(
        <NoteProvider>
          <TestComponent />
        </NoteProvider>
      );
    });

    expect(typeof getNotes).toBe("function");

    const { notes, noteCount } = await getNotes(1, 10, "searchTerm");
    expect(notes).toHaveLength(4);
    expect(noteCount).toBe(4);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4001/notes?search=searchTerm&pageNumber=1&pageSize=10"
    );
  });
});
