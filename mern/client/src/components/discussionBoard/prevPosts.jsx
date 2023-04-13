import React, {useState} from "react";
import { StyledPrevPosts} from "../styles/styledIDB/styledIDBHome";
import { StyledCourseName } from "../styles/styledIDB/styledExistingPost";


export const PrevPosts = () => {
    //will have to take all posts and somehow pass the ID as props to post to render each post for the course 
    const [posts, setPosts] = useState([]);


  return (
    <StyledPrevPosts >
       <StyledCourseName><h3>Course Name</h3> </StyledCourseName>
       <ul>
           {posts.map((post) => <li>{post}</li>)}
       </ul>
     </StyledPrevPosts>
    );
  
}

