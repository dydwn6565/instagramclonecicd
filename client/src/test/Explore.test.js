import Explore from "../components/profileDetail/Explore";
import Header from "../components/Header";
import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { createMemoryHistory } from "history";
import PostImageComponent from "../components/PostImageComponent";
import ExtendedMainModal from "../components/Modals/ExtendedMainModal";
import MyMessage from "../components/MyMessage";
import ProfileMain from "../components/profilePage/ProfileMain";
import SignUp from "../components/SignUp";
describe("explore", ()=>{
  test("explore", async () => {
    render(
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    );

    const exploreImage = document.getElementById("explore-image");

    expect(exploreImage).toHaveAttribute(
      "src",
      "https://img.insight.co.kr/static/2022/05/05/700/img_20220505143127_nqoog77t.webp"
    );

    
  });
})
describe("Header", () => {
  test("Header", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByTestId("header-favorite-icon"));

    expect(screen.getByText("Post Activity"));
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
});
describe("login", () => {
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
  test("login", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const InstagramTitle = screen.getByText("Instagram");
    expect(InstagramTitle).toBeInTheDocument();
  });

  test("login with invalid user input", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const [checkbox, radio, number] = screen.getAllByTestId("add-word-input");
    expect(document.body).toHaveFocus();
    userEvent.tab();
    await userEvent.click(screen.getByTestId("add-word-button"));
    const checkidmessage = screen.getByText("Please check your id");
    expect(checkidmessage).toBeInTheDocument();
  });

  test("login with sign up button ", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/accounts/emailsignup"],
    });

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
});

describe("main", () => {
  test("main", () => {
    const yourMethodMockData = {
      images: ["test.jpg"],
      content: "test content",
      userid: 1,
      id: 1,
      postid: 1,
    };
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
  
test("extended main modal in main page", () => {
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
});
describe("my message", () => {
  test("my message", async () => {
    const obj = {
      id: 1,
      userid: "1234567890",
      username: "Yong",
      name: "OnePunch",
    };
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
        <MyMessage />
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
});
describe("explore", ()=>{
  

test("explore", async () => {
  render(
    <BrowserRouter>
      <ProfileMain />
    </BrowserRouter>
  );

  expect(screen.getByText("Saved"));
  expect(screen.getByText("Taged"));
});
})
describe("sign up", ()=>{
  

test("renders sign up", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const userid = screen.getByText(
    "Please sign up if you want to see your friends pitcure and videos"
  );
  expect(userid).toBeInTheDocument();
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

  const id = screen.getByText("Please type 10 numbers or email");
  expect(id).toBeInTheDocument();
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


})




