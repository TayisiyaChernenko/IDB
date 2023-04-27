import React, {useState, useEffect} from "react";
import { StyledPrevPosts} from "../../styles/styledIDB/styledIDBHome";
import { StyledCourseName } from "../../styles/styledIDB/styledExistingPost";
import { Post } from "./post";


export const PrevPosts = (props) => {
    //will have to take all posts and somehow pass the ID as props to post to render each post for the course 
    const course = props.course;
    const section = props.section;
    const loggedInUser = props.userId;
    const setPosts = props.setPosts;


    useEffect(() => {
      const url = "http://localhost:3000/api/posts/root?course=" + course + "&section=" + section;
      fetch(url,{method: 'get'})
      .then(response => {return response.json()})
      .then(data => {props.setPosts(data)});
  }, [course, section])

  return (
    <StyledPrevPosts >
       <StyledCourseName><h3>{course} {section}</h3> </StyledCourseName>
       <ul>
           {props.posts.map(post => (<li key={post._id}><Post {...{post,loggedInUser,setPosts}}/></li>))}
       </ul>
     </StyledPrevPosts>
    );
  
}

