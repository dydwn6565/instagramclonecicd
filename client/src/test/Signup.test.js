import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUp from "../components/SignUp";

import { BrowserRouter } from "react-router-dom";

import { createMemoryHistory } from "history";
test("renders sign up", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const checkyourname = screen.getByText(
    "Please sign up if you want to see your friends pitcure and videos"
  );
  expect(checkyourname).toBeInTheDocument();
});

test("test user sign up with sign up button", async () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  await userEvent.type(
    screen.getByPlaceholderText("cellphone number or E-mail address"),
    "50"
  );

  await userEvent.click(screen.getByText("Sign up"));

  const checkyourname = screen.getByText("Please type 10 numbers or email");
  expect(checkyourname).toBeInTheDocument();
});



test("test sign up link to login", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/login"],
  });
  render(
    <BrowserRouter history={history}>
      <SignUp />
    </BrowserRouter>
  );

  await userEvent.click(screen.getByRole("link", { name: "Login" }));
  expect(history.location.pathname).toBe("/login");
});

