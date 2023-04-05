import React from "react";
import { StyledPrevPosts} from "../styles/styledIDB/styledIDBHome";
import { Post } from "./post";
import { StyledCourseName } from "../styles/styledIDB/styledExistingPost";


export const PrevPosts = () => {
   return (
   <StyledPrevPosts >
      <StyledCourseName><h3>Course Name</h3> </StyledCourseName>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </StyledPrevPosts>
   );
}

