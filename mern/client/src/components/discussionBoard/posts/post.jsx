import React, {useState,useEffect} from "react";
import { StyledDetails, StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledButton} from "../../styles/styledIDB/styledExistingPost"
import { StyledInputBox , StyledCharCount} from "../../styles/styledIDB/styledCreatePost";
import { AddReply, Reply } from "./reply";
//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    const id = props.post._id;
    const userId = props.userId;
    //states for getting things from API relevant to the page 
    const [name, setName] = useState({});
    const [replies, setReplies] = useState([]);


    
    const postInput = useInput();

    useEffect(() => {
        console.log(postInput);
    }, [postInput]);
    //show alternative views of the page (replies to a post or updatable post)
    const [repliesOpen,setReplyStatus] = useState(false);
    const [updating, setUpdating] = useState(false);



    useEffect(() => {
        fetch('http://localhost:3000/api/user?id=' + id,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)});
    }, [])


    const handleReplies = () => {
        //set the reply state to true so that replies are displayed 
        setReplyStatus(true);
        //will fetch the replies to this specific post 
        fetch('http://localhost:3000/api/posts/' + id + '/replies',{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setReplies(data)})
    }


    const handleDelete = () => {
        
        const url = 'http://localhost:3000/api/posts?id=' + id + "&userId=" + userId;
        fetch(url,{method: 'delete'});
        props.setPosts(prev => prev.filter(post => post._id !== id));
    }
    //Clicking edit on your post will change the updating state to true, and show you a different visual of a post in edit mode
    const handleEdit = () => {
        setUpdating(true);
    }
    //Clicking return will take you back to all posts w/o editting the post but changing the updating state to false again
    const handleReturn = () => {
        setUpdating(false);
    }
    //This actually calls the API and updates the post once the user is satisified with the edits and takes them back to the reguar posts
    const handleUpdate = () => {
        console.log(postInput);
        fetch('http://localhost:3000/api/posts?id='+ id +"&userId=" +userId,{
            method: 'put', 
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({text: postInput.postInput})})
            .then(() => {
                props.setPosts(prev => prev.map(post => {
                    if (post._id === id) {
                        post.text = postInput.postInput
                    }
                    return post;
                }))
                setUpdating(false);
            });
    }


    //component layout for page 
    return(
    <div>
    {(function() {
    if (updating === false) {
    return (
        <div>
        <StyledExistingPost>
            <StyledPostName> {name.firstName} {name.lastName}  </StyledPostName>
            <StyledPostText> {props.post.text}</StyledPostText>
            <StyledDetails>
            {(function() {
            if (userId === name._id) {
                return (<StyledDetails>
                    <StyledButton onClick={handleEdit}>Edit</StyledButton>
                    <StyledButton onClick={handleDelete}>Delete</StyledButton>
                </StyledDetails>
                )
             }
            })()}
            <StyledPostDate>Posted {props.post.time} on {props.post.date}</StyledPostDate>
            <StyledButton onClick={handleReplies}>Replies</StyledButton>
            </StyledDetails>
        </StyledExistingPost>
        {(function() {
            if (repliesOpen === true) {
                console.log("The replies are open!");
                return (
                    //Generate replies
                    <div>
                    <ul>
                    {replies.map(reply => (<li key={reply._id}><Reply {...{reply,userId, id}}/></li>))}
                    </ul>
                     <AddReply {...{id, userId, replies, setReplies}}/>
                     </div>
                )
             }
            })()}
        </div>
        )
        } else{
        return(
            <StyledExistingPost>
            <StyledInputBox
                {...postInput} 
                maxLength={400} />
        <StyledCharCount>Char Count {postInput.charCount}/400</StyledCharCount>
            <StyledDetails>
            <StyledButton onClick={handleUpdate}>Update Post</StyledButton>
            <StyledButton onClick={handleReturn}>Return</StyledButton>
            </StyledDetails>
        </StyledExistingPost>
        )

    }
   })()}

    </div>
   )

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