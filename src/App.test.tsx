// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { screen } from "@testing-library/react";
import { createServer } from "./test/server";
import { renderWithProviders } from "./setupTests";
import App from "./App";

import userEvent from "@testing-library/user-event";

async function renderComponent() {
  renderWithProviders(<App />);
}

describe("Initial tests", () => {
  createServer([
    {
      path: "https://img.cdn4dd.com/s/managed/interview/tps-dogs/api.json",
      res: () => {
        return {
          children: [
            {
              data: {
                title: "I don't want to work today, let's go home",
                preview: {
                  images: [
                    {
                      resolutions: [
                        {},
                        {},
                        {
                          url: "https://img.cdn4dd.com/s/managed/interview/tps-dogs/dog1.jpeg",
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              data: {
                title:
                  "Toronto service dog helps ROM staff member and looks adorable doing it",
                preview: {
                  images: [
                    {
                      resolutions: [
                        {},
                        {},
                        {
                          url: "https://img.cdn4dd.com/s/managed/interview/tps-dogs/dog2.jpeg",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        };
      },
    },
  ]);

  test("page renders", async () => {
    await renderComponent();

    const title = screen.getByText(/demo/i);
    expect(title).toBeInTheDocument;
  });

  test("test buttons", async () => {
    // const button = await screen.findByRole("button", {
    //   name: ">>",
    // });
    // userEvent.click(button);
  });
});

describe("Redux tests", () => {
  test("initialize slice with initialValue", () => {
    // const listSliceInit = ListSlice(initialState, { type: "unknown" });
    // expect(listSliceInit).toBe(initialState);
  });
});
