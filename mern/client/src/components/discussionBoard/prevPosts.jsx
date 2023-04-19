import React, {useState, useEffect} from "react";
import { StyledPrevPosts} from "../styles/styledIDB/styledIDBHome";
import { StyledCourseName } from "../styles/styledIDB/styledExistingPost";
import { Post } from "./post";


export const PrevPosts = (props) => {
    //will have to take all posts and somehow pass the ID as props to post to render each post for the course 
    const userId = props.userId;
    const course = props.course;
    const section = props.section;
    const [posts, setPosts] = useState([]);

    const url = "http://localhost:3000/api/posts?course=" + course + "&section=" + section;

    useEffect(() => {
      fetch(url,{method: 'get'})
      .then(response => {return response.json()})
      .then(data => {setPosts(data)})
  }, [])

  return (
    <StyledPrevPosts >
       <StyledCourseName><h3>{course} {section}</h3> </StyledCourseName>
       <ul>
           {posts.map((post) => <li>{post.text}</li>)}
       </ul>
     </StyledPrevPosts>
    );
  
}

