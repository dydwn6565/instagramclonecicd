import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../components/Login";

import { BrowserRouter } from "react-router-dom";

import { createMemoryHistory } from "history";
test("login", () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const InstagramTitle = screen.getByText("Instagram");
  expect(InstagramTitle).toBeInTheDocument();
});

test("login with invalid user input", async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      )
    ),
  };
  global.navigator.geolocation = mockGeolocation;
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
    
    const [checkbox, radio, number] = screen.getAllByTestId("add-word-input");
     expect(document.body).toHaveFocus();
    userEvent.tab()
    await userEvent.click(screen.getByTestId("add-word-button"));
  const checkidmessage = screen.getByText("Please check your id");
  expect(checkidmessage).toBeInTheDocument();
});


test("login with sign up button ", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/accounts/emailsignup"],
    });
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      )
    ),
  };
  global.navigator.geolocation = mockGeolocation;
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  
  await userEvent.click(screen.getByRole("link", { name: "SignUp" }));
  expect(history.location.pathname).toBe("/accounts/emailsignup");
});



test("login with valid user input", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      )
    ),
  };
  global.navigator.geolocation = mockGeolocation;
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  await userEvent.type(screen.getByTestId("add-word-input"), "1234567890");
  await userEvent.type(screen.getByTestId("add-word-input-two"), "123456");
  
  await userEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(history.location.pathname).toBe("/");
});