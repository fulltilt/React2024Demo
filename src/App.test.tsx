// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from "./store";
import { createServer } from "./test/server";
import { renderWithProviders } from "./setupTests";
import App from "./App";

// async function renderComponent() {
//   renderWithProviders(<App />);

//   await screen.findAllByRole("link");
// }

describe("when user is not signed in", () => {
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
    // await renderComponent();
    // render(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
    renderWithProviders(<App />);

    // const title = screen.getByText(/demo/i);
    // expect(title).toBeInTheDocument();
  });
});
