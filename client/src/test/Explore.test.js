import Explore from "../components/profileDetail/Explore";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

test("explore", async () => {

  render(
    <BrowserRouter >
      <Explore />
    </BrowserRouter>
  );

  const exploreImage = document.getElementById("explore-image");
    
    expect(exploreImage).toHaveAttribute(
      "src",
      "https://img.insight.co.kr/static/2022/05/05/700/img_20220505143127_nqoog77t.webp"
    );
  
   
});