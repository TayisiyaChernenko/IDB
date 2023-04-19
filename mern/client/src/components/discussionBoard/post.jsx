import React, {useState,useEffect} from "react"
import { StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledRepliesButton  } from "../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    
    // usestate for setting a javascript
    // object for storing and using data
    const [postData, setPostData] = useState({});

    // Using useEffect for single rendering of fetched post data (fetched in prevPostscomponent)
    useEffect(() => {
    }, []);
    

   return(
   <StyledExistingPost>
        <StyledPostName> {postData.name} </StyledPostName>
        <StyledPostText> {postData.text}</StyledPostText>
        <StyledPostDate>Posted {postData.time} on {postData.date}</StyledPostDate>
        <StyledRepliesButton>Replies</StyledRepliesButton>
    </StyledExistingPost>
   )
}

