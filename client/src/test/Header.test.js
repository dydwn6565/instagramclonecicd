import Header from "../components/Header";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
test("Header", async () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  await userEvent.click(screen.getByTestId("header-favorite-icon"));
  
    expect(screen.getByText("Post Activity"))
    expect(
      screen.getByText(
        "If someone else likes your post or leaves a comment, it will appear here."
      )
    );
    await userEvent.click(screen.getByTestId("header-avatar"));
     expect(screen.getByText("Profile"));
     expect(screen.getByText("Saved"));
     expect(screen.getByText("Setting"));
});
