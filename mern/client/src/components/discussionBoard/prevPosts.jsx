import React, {useState, useEffect} from "react";
import { StyledPrevPosts} from "../styles/styledIDB/styledIDBHome";
import { Post } from "./post";
import { StyledCourseName } from "../styles/styledIDB/styledExistingPost";


export const PrevPosts = () => {
    //will have to take all posts and somehow pass the ID as props to post to render each post for the course 
    const [posts, setPosts] = useState({});


  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch('http://localhost:5000/api/posts').then((res) =>
          res.json().then((postData) => {
              // Setting a data from api
              setPosts({
                //somehow create posts to post in the return below 
              }).catch(error => console.log(error));
          })
      );
  }, []);
  
   return (
   <StyledPrevPosts >
      <StyledCourseName><h3>Course Name</h3> </StyledCourseName>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </StyledPrevPosts>
   );
}

