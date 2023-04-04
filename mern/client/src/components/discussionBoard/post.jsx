import React from "react"
import { StyledExistingPost,StyledPostText, StyledRepliesButton  } from "../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = () => (
    <StyledExistingPost>
        <StyledPostText>This is an example of a response somone 
        might have already provided to the IDB.
        <StyledRepliesButton>Replies</StyledRepliesButton>
        </StyledPostText>
    </StyledExistingPost>
)

// should be able to connect to database to get a post in this file 
//and place the text content in the StyledPostText component to render