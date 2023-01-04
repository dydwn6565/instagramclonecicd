import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../store/index";


import { BrowserRouter } from "react-router-dom";

import App from "../App";
import { Provider } from "react-redux";
test("renders sign up", () => {
    //  const mockGeolocation = {
    //    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    //      Promise.resolve(
    //        success({
    //          coords: {
    //            latitude: 51.1,
    //            longitude: 45.3,
    //          },
    //        })
    //      )
    //    ),
    //  };
    //  global.navigator.geolocation = mockGeolocation;
    //  global.window.URL.createObjectURL = jest.fn();
    //  HTMLAnchorElement.prototype.click = jest.fn();
   const mockResponse = jest.fn();
   Object.defineProperty(window, "location", {
     value: {
       hash: {
         endsWith: mockResponse,
         includes: mockResponse,
       },
       assign: mockResponse,
     },
     writable: true,
   });
  render(
    <Provider  store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const information = screen.getByText("Information");
  expect(information).toBeInTheDocument();
});
