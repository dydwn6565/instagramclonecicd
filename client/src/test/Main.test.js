import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import PostImageComponent from "../components/PostImageComponent";
import ExtendedMainModal from "../components/Modals/ExtendedMainModal";
test("renders learn react link", () => {

const yourMethodMockData = 
  {
    images: ["test.jpg"],
    content: "test content",
    userid: 1,
    id: 1,
    postid: 1,
  }
;
  render(
    <BrowserRouter>
      <PostImageComponent
        images={yourMethodMockData.images}
        content={yourMethodMockData.content}
        id={yourMethodMockData.id}
        userid={yourMethodMockData.userid}
        postid={yourMethodMockData.postid}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("test content"));

});

test("renders learn react link", () => {

  const yourMethodMockData = {
    like: true,
    images: ["test.jpg"],
    content: "black and white",
    postid: 1,
    commentList: [
      {
        comment: "I hope you to enjoy",
        postid: 1,
        userid: 1,
        username: "yong",
      },
    ],
    postUser: 1,
  };
  render(
    <BrowserRouter>
      <ExtendedMainModal
        like={yourMethodMockData.like}
        images={yourMethodMockData.images}
        content={yourMethodMockData.content}
        postid={yourMethodMockData.postid}
        postUser={yourMethodMockData.postUser}
        commentList={yourMethodMockData.commentList}
       
      />
    </BrowserRouter>
  );

  expect(screen.getByText("black and white"));
  expect(screen.getByText("I hope you to enjoy"));

});