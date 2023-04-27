import React from "react";
import { StyledBox, StyledCharCount, StyledDetails, StyledDirectionButton, StyledInputBox, StyledPostButton, StyledPostOptions, StyledTitleBox} from "../../styles/styledIDB/styledCreatePost";
import { useState } from "react";

//This is the file for the user to create a post

//Connect to the AI python server
const client = new WebSocket("ws://localhost:8000/");

export const AskQuestion = (props) => {
    const postInput = useInput();
    const titleInput = useTitleInput();

    const course = props.course;
    const section = props.section;
    
    const questionInfo = {
        title : titleInput.titleInput,
        text: postInput.postInput,
        courseName : course,
        sectionNum: section,
    }
    //function to recv data from AI python server
    client.onopen = function(){
        console.log("Client Connected");
    };


    const handleAskQuestion = () => { 
        console.log(" A question was Asked");
        //save the question for posting later on 
        props.setQuestion([titleInput.titleInput,postInput.postInput]);
        //send AI the question data
        client.send(JSON.stringify(questionInfo));
        //get response back from AI
        props.setResponse("Some response from AI");
        //tell board a question was asked
        props.setQuestionAsked(true);
        
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
        <StyledPostButton onClick={handleAskQuestion}>Ask</StyledPostButton>
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

// CREATE POST COMPONENT //
// will add the post to the database when you choose to post it, returns the 'view' to the discussion board

export const CreatePost = (props) => {
    const userId = props.userId;
    const course = props.course;
    const section = props.section;
    const title = props.question[0];
    const text = props.question[1];
    

    const postInfo = {
        userId: userId,
        title:title,
        text: text,
        courseName : course,
        sectionNum: section,
    };
    

    const handleAddPost = () => {
        console.log(title);
        console.log(text);
        //send the post string to server
        fetch("http://localhost:3000/api/discussion/post" ,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInfo)
            }).then(response => {return response.json()})
            .then(data => {props.setPosts([...props.posts,data])})
            //sends user back to discussion board
            props.setQuestionAsked(false);
        }
    const handleBack = () => {
        //sends user back to discussion board
        props.setQuestionAsked(false);
    }

    return(
    <div>
        <p>Still want to post to the discussion board?</p>
        <StyledDirectionButton onClick={handleBack}>Don't Post</StyledDirectionButton>
        <StyledDirectionButton onClick={handleAddPost}>Post</StyledDirectionButton>
    </div>
    );
}
