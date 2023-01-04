
import { render, screen } from "@testing-library/react";
import MyMessage from "../components/MyMessage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
test("my message",async () => {
    const obj = {
    id:1,userid:"1234567890",
    username:"Yong",
    name:"OnePunch"
    }
    const userInfo = JSON.stringify(obj, null, 2);
 const localStorageMock = (function () {
   let store = {
     user: {
       id: 1,
     },
     userInfo,
   };

   return {
     getItem(key) {
       return store[key];
     },

     setItem(key, value) {
       store[key] = value;
     },

     clear() {
       store = {};
     },

     removeItem(key) {
       delete store[key];
     },

     getAll() {
       return store;
     },
   };
 })();

 Object.defineProperty(window, "localStorage", { value: localStorageMock });
  const yourMethodMockData = {
    images: ["test.jpg"],
    content: "test content",
    userid: 1,
    id: 1,
    postid: 1,
  };
  
  render(
    <BrowserRouter>
      <MyMessage
        
      />
    </BrowserRouter>
  );
  
  expect(screen.getByText("My message"));
  expect(
    screen.getByText(
      "Send your private picture or message to your friend or group"
    )
  );
   await userEvent.click(screen.getByTestId("message-modal-event"));
   expect(screen.getByText("New message"));
   expect(screen.getByText("Receiver:"));
});
