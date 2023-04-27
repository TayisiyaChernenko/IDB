import { StyledDetails,StyledPostName,StyledPostText, StyledButton} from "../../styles/styledIDB/styledExistingPost"
import {StyledExistingPost, StyledCreateReplyBox, StyledInputBox, StyledPostButton,StyledPostDate,} from "../../styles/styledIDB/styledReplies"
import React, {useState, useEffect} from "react"
import { StyledCharCount} from "../../styles/styledIDB/styledCreatePost";

//This is the file for replies to existing posts 
//Passed a Reply document by the Post file to work with as props with fields text, first/last name of reply poster, and their ID


export const Reply = (props) => {
    const replyInput = useInput();
    const loggedInUser = props.userId;
    const parentPostId = props.id;
    const [replyText,setReplyText] = useState();
    const [updating, setUpdating] = useState(false);
    const [replies, setReplies] = useState([]);
    const [repliesOpen,setReplyStatus] = useState(false);
    const [name, setName] = useState({});




    useEffect(() => {
        //to change 
        fetch('http://localhost:3000/api/user?id=' + parentPostId,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setName(data)});
    }, [])


    const handleReplies = () => {
        (function(){
            if(repliesOpen === true) {
                 setReplyStatus(false)
            } else{
                 //set the reply state to true so that replies are displayed 
                setReplyStatus(true);
                //will fetch the replies to this specific reply
                fetch('url' ,{method: 'get'})
                .then(response => {return response.json()})
                .then(data => {setReplies(data)})
            }

        })()
    }

    const handleDelete = () => {
        fetch('http://localhost:3000/api/posts/replies?replyId=' + props.reply._id + "&postId="+ props.id ,{method: 'delete'});
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
        console.log(replyInput.postInput);
    fetch('http://localhost:3000/api/posts?id='+ props.id +"&userId=" +props.loggedInUser,{method: 'put'},
    {body: JSON.stringify(replyInput.postInput)} )
    .then(setUpdating(false));
    }

    return(
    <StyledExistingPost>
    <StyledPostName> {name.firstName} {name.lastName}   </StyledPostName>
    <StyledPostText> {props.reply.text}</StyledPostText>
    <StyledDetails>
    {(function() {
        //will only see changable options if you are the user who's reply you're seeing
            if (loggedInUser=== name._id) {
                return (<StyledDetails>
                    <StyledButton onClick={handleEdit}>Edit</StyledButton>
                    <StyledButton onClick={handleDelete}>Delete</StyledButton>
                    <StyledButton onClick={handleReplies}>Replies</StyledButton>
                    {(function() {
                            if (repliesOpen === true) {
                                return (
                                    //Generate replies
                                    <div>
                                    <ul>
                                    {replies.map(reply => (<li key={reply._id}><Reply {...{reply,loggedInUser, parentPostId, setReplies}}/></li>))}
                                    </ul>
                                     <AddReply {...{parentPostId, loggedInUser, replies, setReplies}}/>
                                     </div>
                                )
                             }
                            })()}
                </StyledDetails>
                )
             }
            })()}
            <StyledPostDate>Replied {props.reply.datePosted} {props.reply.timePosted}</StyledPostDate>
            </StyledDetails>
    </StyledExistingPost>
    )
}






export const AddReply = (props) => {
    const replyInput = useInput();
    //a reply is like a regular post but with the replyingTo field set 
    //to the id of the post it is replying to and no thread title
    //no need for belongs to discussion either 

    const userId = props.userId;
    const postId = props.id;

    const replyInfo = {
        text: replyInput.replyInput,
        replyingTo: postId,
        userId: userId,
    };

    const handleAddReply = () => {
        fetch("http://localhost:3000/api/posts" , {
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

const useInput = () => {
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


