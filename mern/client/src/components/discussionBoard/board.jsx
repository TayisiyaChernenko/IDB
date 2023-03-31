import React from "react";
import { StyledBoard } from "../styles/styledIDBHome";
import { StyledTitle } from "../styles/styledLogin";



import { PrevPosts } from "./prevPosts";
import { YourPost } from "./yourPost";

export const Board = () => (
    <StyledBoard>
        
        <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
        <PrevPosts/>
        <YourPost/>
    </StyledBoard>
    

) 
