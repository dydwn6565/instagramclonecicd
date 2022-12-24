import React, { useEffect, useState } from "react";
import "../components/css/StoriesActivity.css";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { storyActions } from "../store/index";

function StoriesActivity() {
  
  const [storiesIndexs, setStoriesIndexs] = useState([]);
  const [stories, setStories] = useState([]);
  const dispatch = useDispatch  ();
  useEffect(() => {
    const getStories = async () => {
      const storiesData = await fetch(
        "https://instagramserver1.herokuapp.com/stories",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "POST, GET, OPTIONS, DELETE, PUT, PATCH",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Origin, Contect-Type, x-requdsted-with, Authorization",

            "Content-type": "application/json; charset=UTF-8",
          },
          
        }
      );
      if (storiesData.status === 201) {
        const storiesJson = await storiesData.json();

        sortStories(storiesJson.stories);
        const userIndex = getChangedUserIdIndex(storiesJson);
        
        setStoriesIndexs(userIndex);
        
        const headerAdded =insertHeaderInAPI(storiesJson.stories);
        createNewArray(headerAdded, userIndex);
      }
    };
    getStories();
    
  }, []);

  const getChangedUserIdIndex = (storiesJson) => {
    let userid = 0;
    let indexes = [];
    storiesJson.stories.map((story, index) => {
      if (index === 0) {
        userid = story.userid;
        indexes.push(story.userid);
        
      }
      if (story.userid !== userid) {
        userid = story.userid;
        indexes.push(story.userid);
        
      }
    });
    let filtered = indexes.filter((a, b) => indexes.indexOf(a) === b);
    
    return indexes;
    
  };

  const sortStories = (stories) => {
    return stories.sort((a, b) => {
      if (a.userid < b.userid) {
        return -1;
      }
      if (a.userid > b.userid) {
        return 1;
      }
      return 0;
    });
  };

  const createNewArray = (storiesJson, userIndex) => {
    
    let storyArray = [];
    userIndex.map((userIn) => {
      const sortedStories = storiesJson.filter((story) => {
        return story.userid === userIn;
      });
      storyArray.push(sortedStories);
    });
    // })
    setStories(storyArray);
     dispatch(
       storyActions.updateStory({
         stories: storyArray,
       })
     );
    
  };

  const insertHeaderInAPI = (stories) => {
    let headerAddedArray = [];

    
    stories.map((story) => {
      if (story.heading || story.subheading || story.profileimage) {
        let newObject ={"createdAt":story.createdAt,"duration":story.duration,"header":{
          "heading":story.heading, "subheading":story.subheading,"profileImage":story.profileimage
        }, "id":story.id,"type":story.type,"updatedAt":story.updatedAt,"url":story.url,"userid":story.userid}
        headerAddedArray.push(newObject);
      } else {
        const result = deleteProfileimageKey(story)
        
        headerAddedArray.push({ ...result, profileImage: story.profileimage });
      }
    });
    
    return headerAddedArray;
    
  };
  const deleteProfileimageKey =(story) =>{
    return  Object.keys(story).filter((k) => k !== "profileimage").reduce((acc,key)=>((acc[key]=story[key]),acc),{});
  }
  
  return (
    <div className="stories">
      <div className="stories-block">
        <div className="stories-avatar-list">
          {stories &&
            stories.map((story,index) => (
              <div className="stories-avatar" key={story[0].url}>
                
                <Link
                  state={{ story: story }}
               
                  to={`/story/${story[0].userid}`}
                >
                  <Avatar
                    src={
                      story[0].header !== undefined
                        ? `${story[0].header.profileImage}`
                        : ""
                    }
                  />
                </Link>
                <span>{story[0].header.heading}</span>
              </div>
            ))}
        </div>
      </div>
     
    </div>
  );
}
export default StoriesActivity;
