// import { useNoteContext } from "./DataContext";
// import { matchers } from "jest-json-schema";
// expect.extend(matchers);

// it("should return data with status 200", async () => {
//   const getNotes = useNoteContext();
//   const response = await getNotes();
//   const body = await response.json();

//   const noteSchema = {
//     type: "object",
//     properties: {
//       _id: { type: "number" },
//       title: { type: "string" },
//       content: { type: "string" },
//     },
//     required: ["_id", "title", "content"],
//   };

//   expect(response.status).toBe(200);
//   expect(body.length).toBe(4);

//   body.forEach((note) => {
//     expect(note).toMatchSchema(noteSchema);
//   });
// });

import request from 'supertest'
import { getNotes } from "./DataContext";

test("GET /api/data returns expected data", async () => {
  const response = await request(getNotes).get(
    `http://localhost:4001/notes?pageNumber=${1}&pageSize=${4}`
  );
  expect(response.status).toBe(200);
  expect(response.body.notes).toHaveLength(4);
});
