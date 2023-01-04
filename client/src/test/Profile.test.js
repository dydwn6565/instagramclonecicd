
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import ProfileMain from "../components/profilePage/ProfileMain";

test("explore", async () => {
  render(
    <BrowserRouter>
      <ProfileMain />
    </BrowserRouter>
  );

    expect(screen.getByText("Saved"));
    expect(screen.getByText("Taged"));
    
});
