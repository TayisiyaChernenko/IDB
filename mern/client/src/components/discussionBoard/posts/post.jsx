import React, {useState,useEffect} from "react";
import { StyledDetails, StyledExistingPost,StyledPostDate,StyledPostName,StyledPostText, StyledButton, StyledRHS, StyledClosedThread, StyledThreadTitle, StyledThreadDate, StyledOpenThread} from "../../styles/styledIDB/styledExistingPost"
import { StyledInputBox , StyledCharCount} from "../../styles/styledIDB/styledCreatePost";
import {StyledCreateReplyBox, StyledPostButton} from "../../styles/styledIDB/styledReplies"
//import { AddReply, Reply } from "./reply";
//This is the file for posts that are already in the database stytem

export const Post = (props) => {
    const id = props.post._id;
    const loggedInUser = props.loggedInUser;
    const parentID = props.post.replyingTo;
    //states for getting things from API relevant to the page 
    const [name, setName] = useState({});
    const [nameParent, setNameParent] = useState({});
    const [replies, setReplies] = useState([]);
    const setPosts = props.post.setPosts;


    
    const postInput = useInput();

    //show alternative views of the page (replies to a post or updatable post)
    const [repliesOpen,setReplyStatus] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [open, setToggleThread] = useState(false);



    useEffect(() => {
        //to change 
        fetch('http://localhost:3000/api/user?id=' + id,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)});
        threadState();
        (function(){
            if(parentID !== undefined ) { //if it's a reply 
                findParentName();
            }
        })()

    }, [])

    const findParentName= () => {
        fetch('http://localhost:3000/api/user?id=' + props.post.replyingTo ,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setNameParent(data)});
        threadState();
    }

    //if the post is a reply, it should not have a thread, and thus should skip the closed thread state
    const threadState = () => {
        (function(){
            if(parentID !== undefined) {
                 setToggleThread(true)
            } else{
                setToggleThread(false);
            }
        })()
    }


    const handleReplies = () => {
        (function(){
            if(repliesOpen === true) {
                 setReplyStatus(false)
            } else{
                 //set the reply state to true so that replies are displayed 
                setReplyStatus(true);
                //will fetch the replies to this specific post 
                fetch('http://localhost:3000/api/posts/replies?parentPostId=' + id ,{method: 'get'})
                .then(response => {return response.json()})
                .then(data => {setReplies(data)})
            }

        })()
    }

     //Clicking edit on your post will change the updating state to true, and show you a different visual of a post in edit mode
     const handleOpenThread = () => {
        (function(){
            if(open === true) {
                 setToggleThread(false)
            } else{
                setToggleThread(true);
            }
        })()
    }


    const handleDelete = () => {
        const url = 'http://localhost:3000/api/posts?id=' + id + "&userId=" + loggedInUser;
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
        fetch('http://localhost:3000/api/posts?id='+ id +"&userId=" +loggedInUser,{
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
         {(function(){
                if((parentID === undefined) && (open === false )){
                    return(    // if this is a reply post, there will not be a thread name to open
                        <StyledClosedThread>
                        <StyledPostName> {name.firstName} {name.lastName}  </StyledPostName>
                        < StyledThreadTitle onClick={handleOpenThread}>{props.post.threadTitle}</StyledThreadTitle>
                        <StyledDetails>
                        <StyledThreadDate>Posted {props.post.datePosted} {props.post.timePosted}</StyledThreadDate>
                        </StyledDetails>
                        </StyledClosedThread>
                        )
                    } 
                else{
                return(
                <div>
                {(function() {
                    if (updating === false) {
                    return (
                        <div>
                        <StyledExistingPost>
                            {(function() {
                            if (parentID !== undefined) {
                                return (
                                    <StyledPostName> {name.firstName} {name.lastName}, replying to {nameParent.firstName} {nameParent.lastName}  </StyledPostName>
                                    )}else{
                                       return(
                                     <StyledPostName> {name.firstName} {name.lastName}  </StyledPostName>
                                       ) 
                                    }})()}
                            <StyledButton onClick={handleOpenThread}>{props.post.threadTitle}</StyledButton>
                            <StyledPostText> {props.post.text}</StyledPostText>
                            <StyledRHS>
                            <StyledPostDate>Posted {props.post.datePosted} at {props.post.timePosted}</StyledPostDate>
                            <StyledDetails>
                            {(function() {
                            if (loggedInUser === name._id) {
                                return (<StyledDetails>
                                    <StyledButton onClick={handleEdit}>Edit</StyledButton>
                                    <StyledButton onClick={handleDelete}>Delete</StyledButton>
                                </StyledDetails>
                                )
                             }
                            })()}
                            <StyledButton onClick={handleReplies}>Replies</StyledButton>
                            </StyledDetails>
                            </StyledRHS>
                        </StyledExistingPost>
                        {(function() {
                            if (repliesOpen === true) {
                                return (
                                    //Generate replies
                                    <div>
                                    <ul>
                                    {replies.map(post => (<li key={post._id}><Post {...{post,loggedInUser ,setReplies,setPosts }}/></li>))}
                                    </ul>
                                     <AddReply {...{id, loggedInUser, replies, setReplies}}/>
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
                                maxLength={400}
                                defaultValue = {props.post.text} />
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


export const AddReply = (props) => {
    const replyInput = useReplyInput();
    //a reply is like a regular post but with the replyingTo field set 
    //to the id of the post it is replying to and no thread title
    //no need for belongs to discussion either 

    const loggedInUser = props.loggedInUser;
    const postId = props.id;

    const replyInfo = {
        text: replyInput.replyInput,
        replyingTo: postId,
        userId: loggedInUser,
    };

    const handleAddReply = () => {
        fetch(`${window.location.protocol}//${window.location.hostname}:3000/api/posts` , {
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
        {...replyInput} 
        maxLength={400}
        rows = {3}
        placeholder = "Your reply ... " 
        >
        </StyledInputBox>
        <StyledDetails>
        <StyledCharCount>Char Count {replyInput.charCount}/400</StyledCharCount>
        <StyledPostButton onClick={handleAddReply}>Post</StyledPostButton>
        </StyledDetails>
        </StyledCreateReplyBox>
        
    </div>
    );
}

const useReplyInput = () => {
    const [replyInput,setPostInput] = useState("");
    const [charCount,setCharCount] = useState(0);

    function onChange(e) {
        setPostInput(e.target.value);
        setCharCount(e.target.value.length);
    }
    return{
        replyInput,
        charCount,
        onChange
    }
}


