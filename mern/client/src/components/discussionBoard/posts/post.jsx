import React, {useState,useEffect} from "react"
import { StyledDetails, StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledButton} from "../../styles/styledIDB/styledExistingPost"

//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    const [replies, setReplies] = useState([]);
    const [name, setName] = useState({});
    const id = props.post._id;
    const userId = props.userId;



    useEffect(() => {
        fetch('http://localhost:3000/api/user?id=' + id,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)});
    }, [])

    const url = '';
    const handleReplies = () => {
        //will fetch the replies to this specific post 
        fetch(url,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setReplies(data)})
    }
    const handleDelete = () => {
        console.log("Delete dis post");
        const url = 'http://localhost:3000/api/posts?id=' + id + "&userId=" + userId;
        fetch(url,{method: 'delete'});
    }
    const handleUpdate = () => {
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
                <StyledButton onClick={handleUpdate}>Update</StyledButton>
                <StyledButton onClick={handleDelete}>Delete</StyledButton>
            </StyledDetails>
          }
        })()}
        <StyledPostDate>Posted {props.post.time} on {props.post.date}</StyledPostDate>
        <StyledButton>Replies</StyledButton>
        </StyledDetails>
    </StyledExistingPost>
   )

}
