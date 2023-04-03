import React from "react";
import { StyledBoard } from "../styles/styledIDB/styledIDBHome";
import { StyledTitle } from "../styles/authStyles/styledLogin";



import { PrevPosts } from "./prevPosts";
import { CreatePost } from "./createPost";

// Creates the Page layout consisting of the posts already posted and visible
// to scroll through and view post/reply pairs (prev Posts component)
// and ability to post your own question (create Post component)

export const Board = () => (
    <StyledBoard>
        <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
        <PrevPosts/>
        <CreatePost/>
    </StyledBoard>
    

) 
