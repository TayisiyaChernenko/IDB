import React from "react";
import { StyledBox, StyledCharCount, StyledInputBox, StyledPostButton} from "../../styles/styledIDB/styledCreatePost";
import { useState } from "react";

//This is the file for the user to create a post

export const CreatePost = (props) => {
    const postInput = useInput();

    const userId = props.userId;
    const course = props.course;
    const section = props.section;
    
    const postInfo = {
        userId: userId,
        text: postInput.postInput,
        courseName : course,
        sectionNum: section,
    };

    const handleAddPost = () => {
        fetch("http://localhost:3000/api/discussion/post" ,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInfo),
            }).then((response) => {
           
            })
        }

    return(
    <div>
        <StyledBox>
        <StyledInputBox
        {...postInput} 
        maxLength={400}
        rows = {3}
        placeholder = "Your question ... " 
        >
        </StyledInputBox>
        <StyledCharCount>Char Count {postInput.charCount}/400</StyledCharCount>
        <StyledPostButton onClick={handleAddPost}>Post</StyledPostButton>
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

const useCharCount = (text) => {
    const [charCount,setCharCount] = useState(0);
    function onChange(e) {
        setCharCount(e.target.value.length);
    }
    return{
        charCount,
        onChange
    }
}
//Functionality to create : 
// route to the next page, where the AI will respond 
// if user chooses to post their question after AI responds,
// input is stored into the databse

