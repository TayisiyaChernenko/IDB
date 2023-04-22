import { StyledDetails,StyledPostDate,StyledPostName,StyledPostText, StyledButton} from "../../styles/styledIDB/styledExistingPost"
import {StyledExistingPost, StyledCreateReplyBox, StyledInputBox, StyledPostButton} from "../../styles/styledIDB/styledReplies"
import React, {useState, useEffect} from "react"
import { StyledCharCount} from "../../styles/styledIDB/styledCreatePost";

//This is the file for replies to existing posts 
//Passed a Reply document by the Post file to work with as props with fields text, first/last name of reply poster, and their ID


export const Reply = (props) => {
    const postInput = useInput();
    const loggedInUser = props.userId;
    const [replyText,setReplyText] = useState();
    const [updating, setUpdating] = useState(false);

    

    const handleDelete = () => {
        fetch('/api/posts/' + props.postID+ '/replies?replyId=' + props.reply._id,{method: 'delete'});
        props.setReplies(prev => prev.filter(replies => replies !== props.reply ));
    }

    //Clicking edit on your reply will change the updating state to true, and show you a different visual of a reply in edit mode
    const handleEdit = () => {
        setUpdating(true);
    }


    //Clicking return will take you back to all posts w/o editting the post but changing the updating state to false again
    const handleReturn = () => {
        setUpdating(false);
    }
    //This actually calls the API and updates the post once the user is satisified with the edits and takes them back to the reguar posts
    const handleUpdate = () => {
        console.log(postInput.postInput);
    fetch('http://localhost:3000/api/posts?id='+ props.id +"&userId=" +props.loggedInUser,{method: 'put'},
    {body: JSON.stringify(postInput.postInput)} )
    .then(setUpdating(false));
    }

    return(
    <StyledExistingPost>
    <StyledPostName> {props.reply.firstName} {props.reply.lastName}  </StyledPostName>
    <StyledPostText> {props.reply.replyText}</StyledPostText>
    <StyledDetails>
    {(function() {
        //will only see changable options if you are the user who's reply you're seeing
            if (loggedInUser=== props.reply.userId) {
                return (<StyledDetails>
                    <StyledButton onClick={handleEdit}>Edit</StyledButton>
                    <StyledButton onClick={handleDelete}>Delete</StyledButton>
                </StyledDetails>
                )
             }
            })()}
            <StyledPostDate>Posted {props.reply.time} on {props.reply.date}</StyledPostDate>
            </StyledDetails>
    </StyledExistingPost>
    )
}

export const AddReply = (props) => {
    const postInput = useInput();

    const userId = props.userId;
    const postId = props.id;
    console.log(postInput.postInput);
    const replyInfo = {
        text: postInput.postInput,
        firstName : props.firstName,
        lastName : props.lastName,
        userId: userId,
    };

    const handleAddReply = () => {
        //some url
        console.log(userId);
        fetch("http://localhost:3000/api/posts/reply?postId=" + postId + "&userId=" + userId, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(replyInfo)
            }).then(response => {return response.json()})
            .then(data => {props.setReplies([...props.replies,data])});
        }

    return(
    <div>
        <StyledCreateReplyBox>
        <StyledInputBox
        {...postInput} 
        maxLength={400}
        rows = {3}
        placeholder = "Your reply ... " 
        >
        </StyledInputBox>
        <StyledDetails>
        <StyledCharCount>Char Count {postInput.charCount}/400</StyledCharCount>
        <StyledPostButton onClick={handleAddReply}>Post</StyledPostButton>
        </StyledDetails>
        </StyledCreateReplyBox>
        
    </div>
    );
}

//come back to this and see why it's not storing update 

const useInput = () => {
    const [postInput,setPostInput] = useState("");
    const [charCount,setCharCount] = useState(0);

    function onChange(e) {
        setPostInput(e.target.value);
        setCharCount(e.target.value.length);
    }
    return{
        postInput,
        charCount,
        onChange
    }
}


