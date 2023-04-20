import React, {useState,useEffect} from "react"
import { StyledDetails, StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledRepliesButton} from "../../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    const [replies, setReplies] = useState([]);
    const [name, setName] = useState({});
    const id = props.post._id;
    const userId = props.userId;



    useEffect(() => {
        fetch('http://localhost:3000/api/user?id=' + id,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)}).then(console.log(name));
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
        <StyledPostName> {name.firstName} {name.lastName}  </StyledPostName>
        <StyledPostText> {props.post.text}</StyledPostText>
        <StyledDetails>
        {(function() {
          if (userId === name._id) {
            return <StyledDetails>
                <StyledRepliesButton>Update</StyledRepliesButton>
                <StyledRepliesButton>Delete</StyledRepliesButton>
            </StyledDetails>
          }
        })()}
        <StyledPostDate>Posted {props.post.time} on {props.post.date}</StyledPostDate>
        <StyledRepliesButton>Replies</StyledRepliesButton>
        </StyledDetails>
    </StyledExistingPost>
   )

}
