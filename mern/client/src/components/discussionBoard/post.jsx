import React, {useState,useEffect} from "react"
import { StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledRepliesButton  } from "../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = ({id}) => {
    
    // usestate for setting a javascript
    // object for storing and using data
    const [postData, setPostData] = useState({
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        text: "",
        replies: [],
    });
  
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch('http://localhost:5000/api/posts').then((res) =>
            res.json().then((postData) => {
                // Setting a data from api
                setPostData({
                    firstName: postData.firstName,
                    lastName: postData.lastName,
                    date: postData.date,
                    time: postData.time,
                    text: postData.text,
                    replies: postData.replies
                }).catch(error => console.log(error));
            })
        );
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

// should be able to connect to database to get a post in this file 
//and place the text content in the StyledPostText component to render