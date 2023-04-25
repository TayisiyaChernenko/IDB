import React from "react";
import { StyledBox, StyledCharCount, StyledDetails, StyledInputBox, StyledPostButton, StyledTitleBox} from "../../styles/styledIDB/styledCreatePost";
import { useState } from "react";

//This is the file for the user to create a post

//Connect to the AI python server
const client = new WebSocket("ws://localhost:8000/");

export const CreatePost = (props) => {
    const postInput = useInput();
    const titleInput = useTitleInput();

    const userId = props.userId;
    const course = props.course;
    const section = props.section;
    
    const postInfo = {
        userId: userId,
        title:titleInput.titleInput,
        text: postInput.postInput,
        courseName : course,
        sectionNum: section,
    };
    
    //function to recv data from AI python server
    client.onopen = function(){
        console.log("Client Connected");
    };

    const handleAddPost = () => {

        //send the post string to server
        fetch("http://localhost:3000/api/discussion/post" ,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInfo)
            }).then(response => {return response.json()})
            .then(data => {props.setPosts([...props.posts,data])
            return data["_id"]}).then(id => client.send(JSON.stringify({id})));
        }


    return(
    <div>
        <StyledBox>
        <StyledTitleBox
            {...titleInput} 
            maxLength={20}
            placeholder = "Thread Title ... "   
            >
        </StyledTitleBox>
        <StyledCharCount>Char Count {titleInput.charCount}/20</StyledCharCount>
        <StyledInputBox
        {...postInput} 
        maxLength={400}
        rows = {3}
        placeholder = "Your question ... " 
        >
        </StyledInputBox>
        <StyledDetails>
        <StyledCharCount>Char Count {postInput.charCount}/400</StyledCharCount>
        <StyledPostButton onClick={handleAddPost}>Post</StyledPostButton>
        </StyledDetails>
        </StyledBox>
        
    </div>
    );
}

//Will take input and word count


const useInput = () => {
    const [postInput,setPostInput] = useState('');
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

const useTitleInput = () => {
    const [titleInput,setTitleInput] = useState('');
    const [charCount,setCharCount] = useState(0);

    function onChange(e) {
        setTitleInput(e.target.value);
        setCharCount(e.target.value.length);
    }
    return{
        titleInput,
        charCount,
        onChange
    }
}