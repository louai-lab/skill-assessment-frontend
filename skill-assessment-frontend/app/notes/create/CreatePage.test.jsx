// createPage.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("http://localhost:4001/notes", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("createPage", () => {
  it("should create a new note on form submission", async () => {
    render(<createPage />);

    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Content");
    const createButton = screen.getByText("Create note");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    server.use(
      rest.post("http://localhost:4001/notes", (req, res, ctx) => {
        expect(req.body).toEqual({
          title: "Test Title",
          content: "Test Content",
        });

        return res(ctx.status(200));
      })
    );

    fireEvent.submit(createButton);

    await screen.findByText("Create a new Note");
    expect(titleInput.value).toBe("");
    expect(contentInput.value).toBe("");
  });
});
