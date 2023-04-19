import React, {useState,useEffect} from "react"
import { StyledDetails, StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledRepliesButton} from "../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    const [replies, setReplies] = useState([]);
    const [name, setName] = useState([]);
    const id = props._id;


    useEffect(() => {
        fetch('http://localhost:3000/api/user?id=' + id,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)})
    }, [])

    const url = '';
    const handleClick = () => {
        //will fetch the replies to this specific post 
        fetch(url,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setReplies(data)})
    }

    return(
   <StyledExistingPost>
        <StyledPostName> {name[0]} {name[1]}  </StyledPostName>
        <StyledPostText> {props.text}</StyledPostText>
        <StyledDetails>
        <StyledPostDate>Posted {props.time} on {props.date}</StyledPostDate>
        <StyledRepliesButton>Replies</StyledRepliesButton>
        </StyledDetails>
    </StyledExistingPost>
   )

}
